package com.travelhub.service;
import com.travelhub.entity.PhoneOtp;
import com.travelhub.entity.User;
import com.travelhub.entity.VerificationToken;
import com.travelhub.repository.PhoneOtpRepository;
import com.travelhub.repository.VerificationTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Random;
import java.util.UUID;
@Service
@RequiredArgsConstructor
public class OtpService {

    private final JavaMailSender mailSender;
    private final VerificationTokenRepository verificationTokenRepository;
    private final PhoneOtpRepository phoneOtpRepository;

    private final long OTP_EXPIRY_SECONDS = 300; // 5 minutes

    public String sendEmailOtp(User user) {
        if(user.getEmail() == null) return null; // skip if email not provided

        String token = UUID.randomUUID().toString();
        VerificationToken vToken = VerificationToken.builder()
                .token(token)
                .user(user)
                .expiryDate(Instant.now().plusSeconds(OTP_EXPIRY_SECONDS))
                .build();
        verificationTokenRepository.save(vToken);

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(user.getEmail());
        mail.setSubject("Email Verification OTP");
        mail.setText("Your OTP is: " + token + "\nExpires in 5 minutes.");
        mailSender.send(mail);

        return token;
    }

    public boolean verifyEmailOtp(User user, String otp) {
        if(user.getEmail() == null) return false;

        VerificationToken tokenEntity = verificationTokenRepository
                .findByUser(user)
                .orElse(null);

        if(tokenEntity == null || !tokenEntity.getToken().equals(otp)) return false;
        if(tokenEntity.getExpiryDate().isBefore(Instant.now())) return false;

        verificationTokenRepository.delete(tokenEntity); // remove after successful verification
        return true;
    }

    public String sendPhoneOtp(User user) {
        if(user.getPhone() == null) return null; // skip if phone not provided

        String otp = String.format("%06d", new Random().nextInt(999999));
        PhoneOtp phoneOtp = PhoneOtp.builder()
                .phone(user.getPhone())
                .otp(otp)
                .expiryDate(Instant.now().plusSeconds(OTP_EXPIRY_SECONDS))
                .attempts(0)
                .build();
        phoneOtpRepository.save(phoneOtp);

        // Here integrate SMS provider e.g., Twilio
        System.out.println("Sending OTP to phone " + user.getPhone() + ": " + otp);

        return otp;
    }

    public boolean verifyPhoneOtp(User user, String otp) {
        if(user.getPhone() == null) return false;

        PhoneOtp phoneOtp = phoneOtpRepository.findByPhone(user.getPhone())
                .orElse(null);

        if(phoneOtp == null || !phoneOtp.getOtp().equals(otp)) return false;
        if(phoneOtp.getExpiryDate().isBefore(Instant.now())) return false;

        phoneOtpRepository.delete(phoneOtp); // remove after success
        return true;
    }
}
