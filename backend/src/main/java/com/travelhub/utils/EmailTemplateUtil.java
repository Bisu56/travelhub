package com.travelhub.utils;

import org.springframework.stereotype.Component;

@Component
public class EmailTemplateUtil {

    public String buildOtpEmail(String otp) {
        return "<html><body>"
                + "<h3>Your OTP Code</h3>"
                + "<p>Use this code to complete your verification: <b>" + otp + "</b></p>"
                + "<p>This code expires in 5 minutes.</p>"
                + "</body></html>";
    }

    public String buildWelcomeEmail(String username) {
        return "<html><body>"
                + "<h3>Welcome " + username + "</h3>"
                + "<p>Thank you for registering at TravelHub.</p>"
                + "</body></html>";
    }
}
