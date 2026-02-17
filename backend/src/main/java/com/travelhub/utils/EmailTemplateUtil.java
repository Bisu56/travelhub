package com.travelhub.utils;

import org.springframework.stereotype.Component;

@Component
public class EmailTemplateUtil {

    public String buildOtpEmail(String otp) {
        return "<html>" +
                "<body style='font-family:Arial,sans-serif; background-color:#f4f6f8; padding:20px;'>" +
                "<div style='max-width:600px; margin:auto; border:1px solid #ddd; border-radius:8px; overflow:hidden;'>" +
                "<div style='background: linear-gradient(to right, #1e90ff, #ff8c00); padding:20px; color:white; text-align:center;'>" +
                "<h2>TravelHub OTP Verification</h2>" +
                "</div>" +
                "<div style='padding:20px; text-align:center;'>" +
                "<p style='font-size:16px;'>Your One-Time Password (OTP) is:</p>" +
                "<h1 style='font-size:32px; color:#1e90ff; letter-spacing:4px;'>" + otp + "</h1>" +
                "<p style='font-size:14px; color:#555;'>This OTP is valid for 5 minutes.</p>" +
                "</div>" +
                "<div style='background:#f4f6f8; text-align:center; padding:10px; font-size:12px; color:#888;'>" +
                "TravelHub &copy; 2026" +
                "</div>" +
                "</div>" +
                "</body>" +
                "</html>";
    }

    public String buildWelcomeEmail(String username) {
        return "<html>" +
                "<body style='font-family:Arial,sans-serif; background-color:#f4f6f8; padding:20px;'>" +
                "<div style='max-width:600px; margin:auto; border:1px solid #ddd; border-radius:8px; overflow:hidden;'>" +
                "<div style='background: linear-gradient(to right, #ff8c00, #1e90ff); padding:20px; color:white; text-align:center;'>" +
                "<h2>Welcome to TravelHub, " + username + "!</h2>" +
                "</div>" +
                "<div style='padding:20px; text-align:center;'>" +
                "<p style='font-size:16px;'>Thank you for registering. We're excited to have you on board!</p>" +
                "</div>" +
                "<div style='background:#f4f6f8; text-align:center; padding:10px; font-size:12px; color:#888;'>" +
                "TravelHub &copy; 2026" +
                "</div>" +
                "</div>" +
                "</body>" +
                "</html>";
    }
}
