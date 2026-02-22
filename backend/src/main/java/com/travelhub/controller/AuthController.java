package com.travelhub.controller;

import com.travelhub.Dtos.AuthResponse;
import com.travelhub.Dtos.RegisterRequest;
import com.travelhub.Dtos.UserProfileDTO;
import com.travelhub.entity.User;
import com.travelhub.service.AuthService;
import com.travelhub.service.OtpService;
import com.travelhub.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final OtpService otpService;
    private final UserService userService;

    // ------------------- Registration -------------------
    @PostMapping("/register/user")
    public ResponseEntity<String> registerUser(@RequestBody @Valid RegisterRequest request) {
        User user = authService.registerUser(request.getEmail(), request.getPhone(), request.getPassword());
        return sendInitialOtp(user);
    }

    @PostMapping("/register/agent")
    public ResponseEntity<String> registerAgent(@RequestBody @Valid RegisterRequest request) {
        User agent = authService.registerAgent(request.getEmail(), request.getPhone(), request.getPassword());
        return sendInitialOtp(agent);
    }

    @PostMapping("/register/admin")
    public ResponseEntity<String> registerAdmin(@RequestBody @Valid RegisterRequest request) {
        User admin = authService.registerAdmin(request.getEmail(), request.getPhone(), request.getPassword());
        return sendInitialOtp(admin);
    }

    private ResponseEntity<String> sendInitialOtp(User user) {
        if (user.getEmail() != null) otpService.sendEmailOtp(user);
        else if (user.getPhone() != null) otpService.sendPhoneOtp(user);
        else throw new RuntimeException("Email or phone must be provided");

        return ResponseEntity.ok("Registration successful. OTP sent. Verification required.");
    }

    // ------------------- OTP Verification -------------------
    @PostMapping("/verify/email")
    public ResponseEntity<String> verifyEmail(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");

        User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean verified = userService.verifyOtp(user, otp, "email");
        return verified
                ? ResponseEntity.ok("Email verified successfully")
                : ResponseEntity.badRequest().body("Invalid or expired OTP");
    }

    @PostMapping("/verify/phone")
    public ResponseEntity<String> verifyPhone(@RequestBody Map<String, String> request) {
        String phone = request.get("phone");
        String otp = request.get("otp");

        User user = userService.getUserByPhone(phone)
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean verified = userService.verifyOtp(user, otp, "phone");
        return verified
                ? ResponseEntity.ok("Phone verified successfully")
                : ResponseEntity.badRequest().body("Invalid or expired OTP");
    }

    // ------------------- Resend OTP -------------------
    @PostMapping("/resend/email-otp")
    public ResponseEntity<String> resendEmailOtp(@RequestBody Map<String, String> request) {
        User user = userService.getUserByEmail(request.get("email"))
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (Boolean.TRUE.equals(user.getEmailVerified())) {
            return ResponseEntity.badRequest().body("Email already verified");
        }
        otpService.sendEmailOtp(user);
        return ResponseEntity.ok("Email OTP resent successfully");
    }

    @PostMapping("/resend/phone-otp")
    public ResponseEntity<String> resendPhoneOtp(@RequestBody Map<String, String> request) {
        User user = userService.getUserByPhone(request.get("phone"))
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (Boolean.TRUE.equals(user.getPhoneVerified())) {
            return ResponseEntity.badRequest().body("Phone already verified");
        }
        otpService.sendPhoneOtp(user);
        return ResponseEntity.ok("Phone OTP resent successfully");
    }

    // ------------------- Login / Logout -------------------
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody Map<String, String> request) {
        String loginId = request.getOrDefault("emailOrPhone",
                request.getOrDefault("email", request.get("phone")));
        String password = request.get("password");
        return ResponseEntity.ok(authService.login(loginId, password));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");
        boolean success = authService.logout(refreshToken);
        return success
                ? ResponseEntity.ok("Logged out successfully")
                : ResponseEntity.badRequest().body("Invalid or already revoked token");
    }

    // ------------------- Forgot Password -------------------
    @PostMapping("/forgot-password/request")
    public ResponseEntity<String> forgotPasswordRequest(@RequestBody Map<String, String> request) {
        String emailOrPhone = request.get("emailOrPhone");
        User user = userService.getByEmailOrPhone(emailOrPhone)
                .orElseThrow(() -> new RuntimeException("User not found"));
        String otp = emailOrPhone.contains("@") ? otpService.sendEmailOtp(user) : otpService.sendPhoneOtp(user);
        return otp != null
                ? ResponseEntity.ok("OTP sent successfully")
                : ResponseEntity.status(429).body("Too many requests");
    }

    @PostMapping("/forgot-password/verify")
    public ResponseEntity<String> forgotPasswordVerify(@RequestBody Map<String, String> request) {
        String emailOrPhone = request.get("emailOrPhone");
        String otp = request.get("otp");
        User user = userService.getByEmailOrPhone(emailOrPhone)
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean verified = emailOrPhone.contains("@") ? otpService.verifyEmailOtp(user, otp)
                : otpService.verifyPhoneOtp(user, otp);
        if (!verified) return ResponseEntity.badRequest().body("Invalid or expired OTP");

        String tempToken = authService.createPasswordResetToken(user);
        return ResponseEntity.ok(tempToken);
    }

    @PostMapping("/forgot-password/reset")
    public ResponseEntity<String> forgotPasswordReset(@RequestBody Map<String, String> request) {
        String token = request.get("resetToken");
        String newPassword = request.get("newPassword");

        if (!authService.validatePasswordResetToken(token)) {
            return ResponseEntity.badRequest().body("Invalid or expired token");
        }

        User user = authService.getUserByPasswordResetToken(token);
        authService.changePassword(user, newPassword);
        authService.invalidatePasswordResetToken(token);
        return ResponseEntity.ok("Password reset successfully");
    }

    // ------------------- Profile -------------------
    @GetMapping("/profile")
    public ResponseEntity<UserProfileDTO> getProfile(Authentication auth) {
        User user = userService.getCurrentUser(auth);
        return ResponseEntity.ok(UserProfileDTO.fromUser(user));
    }

    @PutMapping("/profile")
    public ResponseEntity<UserProfileDTO> updateProfile(@RequestBody UserProfileDTO dto, Authentication auth) {
        User user = userService.getCurrentUser(auth);
        userService.updateProfile(user, dto);
        return ResponseEntity.ok(UserProfileDTO.fromUser(user));
    }

    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody Map<String, String> request, Authentication auth) {
        User user = userService.getCurrentUser(auth);
        String oldPassword = request.get("oldPassword");
        String newPassword = request.get("newPassword");
        String confirmPassword = request.get("confirmPassword");

        if (!newPassword.equals(confirmPassword)) return ResponseEntity.badRequest().body("Passwords do not match");
        if (!authService.checkPassword(user, oldPassword)) return ResponseEntity.badRequest().body("Old password incorrect");

        authService.changePassword(user, newPassword);
        authService.invalidateOtherSessions(user);

        return ResponseEntity.ok("Password changed successfully");
    }
}