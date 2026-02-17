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

    // Email OTP
    public String sendEmailOtp(User user) {
        String token = UUID.randomUUID().toString();
        VerificationToken vToken = VerificationToken.builder()
                .token(token)
                .user(user)
                .expiryDate(Instant.now().plusSeconds(300))
                .build();
        verificationTokenRepository.save(vToken);

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(user.getEmail());
        mail.setSubject("Email Verification OTP");
        mail.setText("Your OTP is: " + token);
        mailSender.send(mail);

        return token;
    }

    // Phone OTP
    public String sendPhoneOtp(User user) {
        String otp = String.format("%06d", new Random().nextInt(999999));
        PhoneOtp phoneOtp = PhoneOtp.builder()
                .phone(user.getPhone())
                .otp(otp)
                .expiryDate(Instant.now().plusSeconds(300))
                .attempts(0)
                .build();
        phoneOtpRepository.save(phoneOtp);

        // Integrate SMS provider here (Twilio/Nexmo etc.)
        System.out.println("Sending OTP to phone " + user.getPhone() + ": " + otp);

        return otp;
    }
}
