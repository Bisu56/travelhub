package com.travelhub.controller;
import com.travelhub.Dtos.AuthRequest;
import com.travelhub.Dtos.AuthResponse;
import com.travelhub.entity.User;
import com.travelhub.entity.enums.AccountStatus;
import com.travelhub.entity.enums.Role;
import com.travelhub.service.AuthService;
import com.travelhub.service.OtpService;
import com.travelhub.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final OtpService otpService;
    private final UserService userService;

    @PostMapping("/register/user")
    public ResponseEntity<String> registerUser(@RequestParam(required = false) String email,
                                               @RequestParam(required = false) String phone,
                                               @RequestParam String password) {
        User user = authService.registerUser(email, phone, password);

        // Send OTP for the field(s) provided
        if (email != null) otpService.sendEmailOtp(user);
        if (phone != null) otpService.sendPhoneOtp(user);

        return ResponseEntity.ok("USER registered. OTP sent to the field(s) you provided. Verification required.");
    }

    @PostMapping("/register/agent")
    public ResponseEntity<String> registerAgent(@RequestParam(required = false) String email,
                                                @RequestParam(required = false) String phone,
                                                @RequestParam String password) {
        User agent = authService.registerAgent(email, phone, password);

        if (email != null) otpService.sendEmailOtp(agent);
        if (phone != null) otpService.sendPhoneOtp(agent);

        return ResponseEntity.ok("AGENT registered. OTP sent to the provided fields. Awaiting ADMIN approval after verification.");
    }

    @PostMapping("/register/admin")
    public ResponseEntity<String> registerAdmin(@RequestParam(required = false) String email,
                                                @RequestParam(required = false) String phone,
                                                @RequestParam String password) {
        User admin = authService.registerAdmin(email, phone, password);

        if (email != null) otpService.sendEmailOtp(admin);
        if (phone != null) otpService.sendPhoneOtp(admin);

        return ResponseEntity.ok("ADMIN registered. OTP sent to the provided fields (if any).");
    }

    @PostMapping("/verify/email")
    public ResponseEntity<String> verifyEmailOtp(@RequestParam String email,
                                                 @RequestParam String otp) {

        User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getEmail().equals(email)) {
            return ResponseEntity.badRequest().body("Email not registered.");
        }

        boolean verified = otpService.verifyEmailOtp(user, otp);
        if (verified) {
            user.setEmailVerified(true);

            // Auto-approve USER if email is verified
            if(user.getRole() == Role.USER) {
                user.setAccountStatus(AccountStatus.APPROVED);
            }

            userService.saveUser(user);
            return ResponseEntity.ok("Email verified successfully. Your account is now ACTIVE.");
        }
        return ResponseEntity.badRequest().body("Invalid or expired OTP");
    }

    @PostMapping("/verify/phone")
    public ResponseEntity<String> verifyPhoneOtp(@RequestParam String phone,
                                                 @RequestParam String otp) {

        User user = userService.getUserByPhone(phone)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPhone().equals(phone)) {
            return ResponseEntity.badRequest().body("Phone not registered.");
        }

        boolean verified = otpService.verifyPhoneOtp(user, otp);
        if (verified) {
            user.setPhoneVerified(true);

            if(user.getRole() == Role.USER) {
                user.setAccountStatus(AccountStatus.APPROVED);
            }

            userService.saveUser(user);
            return ResponseEntity.ok("Phone verified successfully. Your account is now ACTIVE.");
        }
        return ResponseEntity.badRequest().body("Invalid or expired OTP");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestParam String emailOrPhone,
                                              @RequestParam String password) {
        return ResponseEntity.ok(authService.login(emailOrPhone, password));
    }
}
