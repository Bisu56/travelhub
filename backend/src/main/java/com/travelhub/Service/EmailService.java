package com.travelhub.Service;
import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Properties;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final String SMTP_HOST = "smtp.gmail.com";
    private final String SMTP_PORT = "587";
    private final String USERNAME = "your-email@gmail.com"; // replace
    private final String PASSWORD = "your-app-password";    // replace

    public void sendEmail(String to, String subject, String content) {
        Properties props = new Properties();
        props.put("mail.smtp.host", SMTP_HOST);
        props.put("mail.smtp.port", SMTP_PORT);
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");

        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(USERNAME, PASSWORD);
            }
        });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(USERNAME));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
            message.setSubject(subject);
            message.setText(content);
            Transport.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }

    // Optional helper for OTP email
    public void sendOtpEmail(String to, String otp) {
        String subject = "Your OTP Code";
        String body = "Your OTP code is: " + otp + "\nIt will expire in 5 minutes.";
        sendEmail(to, subject, body);
    }
}
