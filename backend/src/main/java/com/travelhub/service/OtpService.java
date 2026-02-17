package com.travelhub.service;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Refill;
import com.travelhub.entity.PhoneOtp;
import com.travelhub.entity.User;
import com.travelhub.entity.VerificationToken;
import com.travelhub.repository.PhoneOtpRepository;
import com.travelhub.repository.VerificationTokenRepository;
import com.travelhub.utils.EmailTemplateUtil;
import com.travelhub.utils.OtpGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.Instant;
@Service
@RequiredArgsConstructor
public class OtpService {

    private final VerificationTokenRepository verificationTokenRepository;
    private final PhoneOtpRepository phoneOtpRepository;
    private final BrevoService brevoService;
    private final OtpGenerator otpGenerator;
    private final EmailTemplateUtil emailTemplateUtil;

    private final Bucket emailOtpBucket;
    private final Bucket phoneOtpBucket;

    private final long OTP_EXPIRY_SECONDS = 600; // 10 min

    public String sendEmailOtp(User user) {
        if (user.getEmail() == null) return null;

        if (!emailOtpBucket.tryConsume(1)) {
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

        if (tokenEntity == null) return false;
        if (!tokenEntity.getToken().equals(otp)) return false;
        if (tokenEntity.getExpiryDate().isBefore(Instant.now())) return false;
        verificationTokenRepository.delete(tokenEntity); // mark as used
        return true;
    }

    public String sendPhoneOtp(User user) {
        if (user.getPhone() == null) return null;

        if (!phoneOtpBucket.tryConsume(1)) {
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
        brevoService.sendSms(user.getPhone(), message);

        return otp;
    }

    public boolean verifyPhoneOtp(User user, String otp) {
        if (user.getPhone() == null) return false;

        PhoneOtp phoneOtp = phoneOtpRepository.findByPhone(user.getPhone()).orElse(null);
        if (phoneOtp == null) return false;
        if (!phoneOtp.getOtp().equals(otp)) return false;
        if (phoneOtp.getExpiryDate().isBefore(Instant.now())) return false;

        phoneOtpRepository.delete(phoneOtp);
        return true;
    }
}
