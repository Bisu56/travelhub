package com.travelhub.controller;
import com.travelhub.Dtos.AuthResponse;
import com.travelhub.Dtos.RegisterRequest;
import com.travelhub.entity.User;
import com.travelhub.entity.enums.AccountStatus;
import com.travelhub.service.AuthService;
import com.travelhub.service.OtpService;
import com.travelhub.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final OtpService otpService;
    private final UserService userService;

    @PostMapping("/register/user")
    public ResponseEntity<String> registerUser(@RequestBody @Valid RegisterRequest request) {
        User user = authService.registerUser(request.getEmail(), request.getPhone(), request.getPassword());
        return sendInitialOtp(user, "USER");
    }

    @PostMapping("/register/agent")
    public ResponseEntity<String> registerAgent(@RequestBody @Valid RegisterRequest request) {
        User agent = authService.registerAgent(request.getEmail(), request.getPhone(), request.getPassword());
        return sendInitialOtp(agent, "AGENT");
    }

    @PostMapping("/register/admin")
    public ResponseEntity<String> registerAdmin(@RequestBody @Valid RegisterRequest request) {
        User admin = authService.registerAdmin(request.getEmail(), request.getPhone(), request.getPassword());
        return sendInitialOtp(admin, "ADMIN");
    }

    private ResponseEntity<String> sendInitialOtp(User user, String role) {
        if (user.getEmail() != null) {
            otpService.sendEmailOtp(user);
            return ResponseEntity.ok(role + " registered. OTP sent to email. Verification required.");
        } else if (user.getPhone() != null) {
            otpService.sendPhoneOtp(user);
            return ResponseEntity.ok(role + " registered. OTP sent to phone. Verification required.");
        } else {
            throw new RuntimeException("Either email or phone must be provided");
        }
    }

    @PostMapping("/verify/email")
    public ResponseEntity<String> verifyEmailOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");

        if (email == null || otp == null) return ResponseEntity.badRequest().body("Email and OTP required");

        User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (Boolean.TRUE.equals(user.getEmailVerified())) {
            return ResponseEntity.badRequest().body("Email is already verified.");
        }

        if (otpService.verifyEmailOtp(user, otp)) {
            user.setEmailVerified(true);
            updateAccountStatusAfterVerification(user);
            userService.saveUser(user);
            return ResponseEntity.ok("Email verified successfully.");
        }

        return ResponseEntity.badRequest().body("Invalid or expired OTP");
    }

    @PostMapping("/verify/phone")
    public ResponseEntity<String> verifyPhoneOtp(@RequestBody Map<String, String> request) {
        String phone = request.get("phone");
        String otp = request.get("otp");

        if (phone == null || otp == null) return ResponseEntity.badRequest().body("Phone and OTP required");

        User user = userService.getUserByPhone(phone)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (Boolean.TRUE.equals(user.getPhoneVerified())) {
            return ResponseEntity.badRequest().body("Phone is already verified.");
        }

        if (otpService.verifyPhoneOtp(user, otp)) {
            user.setPhoneVerified(true);
            updateAccountStatusAfterVerification(user);
            userService.saveUser(user);
            return ResponseEntity.ok("Phone verified successfully.");
        }

        return ResponseEntity.badRequest().body("Invalid or expired OTP");
    }

    private void updateAccountStatusAfterVerification(User user) {
        switch (user.getRole()) {
            case USER -> user.setAccountStatus(AccountStatus.APPROVED);
            case AGENT -> {
                if (Boolean.TRUE.equals(user.getEmailVerified()) || Boolean.TRUE.equals(user.getPhoneVerified())) {
                    user.setAccountStatus(AccountStatus.PENDING);
                }
            }
        //    REMOVED DUPLICATE ACCOUNT STATUS APPROVED
//            case ADMIN -> user.setAccountStatus(AccountStatus.APPROVED);
        }
    }
    @PostMapping("/resend/email-otp")
    public ResponseEntity<String> resendEmailOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (Boolean.TRUE.equals(user.getEmailVerified())) {
            return ResponseEntity.badRequest().body("Email is already verified.");
        }

        if (!otpService.tryConsumeEmailOtpBucket(user)) {
            return ResponseEntity.status(429).body("Too many requests. Try again later.");
        }

        otpService.sendEmailOtp(user);
        return ResponseEntity.ok("Email OTP resent successfully.");
    }

    @PostMapping("/resend/phone-otp")
    public ResponseEntity<String> resendPhoneOtp(@RequestBody Map<String, String> request) {
        String phone = request.get("phone");
        User user = userService.getUserByPhone(phone)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (Boolean.TRUE.equals(user.getPhoneVerified())) {
            return ResponseEntity.badRequest().body("Phone is already verified.");
        }

        if (!otpService.tryConsumePhoneOtpBucket(user)) {
            return ResponseEntity.status(429).body("Too many requests. Try again later.");
        }

        otpService.sendPhoneOtp(user);
        return ResponseEntity.ok("Phone OTP resent successfully.");


    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody Map<String, String> request) {
        String emailOrPhone = request.getOrDefault("emailOrPhone",
                request.getOrDefault("email", request.get("phone")));
        String password = request.get("password");

        if (emailOrPhone == null || password == null) {
            return ResponseEntity.badRequest().body(null);
        }

        return ResponseEntity.ok(authService.login(emailOrPhone, password));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");

        boolean success = authService.logout(refreshToken);
        if (success) {
            return ResponseEntity.ok("Logged out successfully");
        } else {
            return ResponseEntity.badRequest().body("Invalid or already revoked refresh token");
        }
    }
}
