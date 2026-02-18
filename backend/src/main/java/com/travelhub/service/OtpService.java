package com.travelhub.service;
import com.travelhub.config.OtpBucketManager;
import com.travelhub.entity.PhoneOtp;
import com.travelhub.entity.User;
import com.travelhub.entity.VerificationToken;
import com.travelhub.repository.PhoneOtpRepository;
import com.travelhub.repository.VerificationTokenRepository;
import com.travelhub.utils.EmailTemplateUtil;
import com.travelhub.utils.OtpGenerator;
import io.github.bucket4j.Bucket;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class OtpService {

    private final VerificationTokenRepository verificationTokenRepository;
    private final PhoneOtpRepository phoneOtpRepository;
    private final BrevoService brevoService;
    private final TwilioSmsService twilioSmsService;
    private final OtpGenerator otpGenerator;
    private final EmailTemplateUtil emailTemplateUtil;
    private final OtpBucketManager otpBucketManager;

    private final long OTP_EXPIRY_SECONDS = 600; // 10 min

    public String sendEmailOtp(User user) {
        if (user.getEmail() == null) return null;

        Bucket bucket = otpBucketManager.resolveEmailBucket(user.getEmail());
        if (!bucket.tryConsume(1)) {
            throw new RuntimeException("Too many OTP requests. Please try again later.");
        }

        String otp = otpGenerator.generateOtp();
        VerificationToken tokenEntity = VerificationToken.builder()
                .token(otp)
                .user(user)
                .expiryDate(Instant.now().plusSeconds(OTP_EXPIRY_SECONDS))
                .build();
        verificationTokenRepository.save(tokenEntity);

        String htmlContent = emailTemplateUtil.buildOtpEmail(otp);
        brevoService.sendEmail(user.getEmail(), "Email Verification OTP", htmlContent);

        return otp;
    }

    public boolean verifyEmailOtp(User user, String otp) {
        if (user.getEmail() == null) return false;

        VerificationToken tokenEntity = verificationTokenRepository
                .findTopByUserOrderByExpiryDateDesc(user)
                .orElse(null);

        if (tokenEntity == null || !tokenEntity.getToken().equals(otp) || tokenEntity.getExpiryDate().isBefore(Instant.now()))
            return false;

        verificationTokenRepository.delete(tokenEntity); // mark as used
        return true;
    }

    public String sendPhoneOtp(User user) {
        if (user.getPhone() == null) return null;

        Bucket bucket = otpBucketManager.resolvePhoneBucket(user.getPhone());
        if (!bucket.tryConsume(1)) {
            throw new RuntimeException("Too many OTP requests. Please try again later.");
        }

        String otp = otpGenerator.generateOtp();
        PhoneOtp phoneOtp = PhoneOtp.builder()
                .phone(user.getPhone())
                .otp(otp)
                .expiryDate(Instant.now().plusSeconds(OTP_EXPIRY_SECONDS))
                .attempts(0)
                .build();
        phoneOtpRepository.save(phoneOtp);

        String message = "Your OTP code is: " + otp + ". It will expire in 10 minutes.";
        twilioSmsService.sendSms(user.getPhone(), message);

        return otp;
    }

    public boolean verifyPhoneOtp(User user, String otp) {
        if (user.getPhone() == null) return false;

        PhoneOtp phoneOtp = phoneOtpRepository.findTopByPhoneOrderByExpiryDateDesc(user.getPhone()).orElse(null);
        if (phoneOtp == null || !phoneOtp.getOtp().equals(otp) || phoneOtp.getExpiryDate().isBefore(Instant.now()))
            return false;

        phoneOtpRepository.delete(phoneOtp);
        return true;
    }
    public boolean tryConsumeEmailOtpBucket(User user) {
        return otpBucketManager.resolveEmailBucket(user.getEmail()).tryConsume(1);
    }

    public boolean tryConsumePhoneOtpBucket(User user) {
        return otpBucketManager.resolvePhoneBucket(user.getPhone()).tryConsume(1);
    }

}
