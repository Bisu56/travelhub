package com.travelhub.service;

import com.travelhub.Dtos.AuthResponse;
import com.travelhub.entity.User;
import com.travelhub.entity.enums.AccountStatus;
import com.travelhub.entity.enums.Role;
import com.travelhub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final AuditService auditService;
    private final OtpService otpService;

    private final Map<String, PasswordResetToken> passwordResetTokenStore = new HashMap<>();

    // ---------------- Registration ----------------
    public User registerUser(String email, String phone, String password) {
        validateUniqueUser(email, phone);
        User user = User.builder()
                .email(email)
                .phone(phone)
                .password(passwordEncoder.encode(password))
                .role(Role.USER)
                .accountStatus(AccountStatus.PENDING)
                .emailVerified(false)
                .phoneVerified(false)
                .active(true)
                .build();
        userRepository.save(user);
        auditService.logAction(email != null ? email : phone, "USER_REGISTER");
        return user;
    }

    public User registerAgent(String email, String phone, String password) {
        validateUniqueUser(email, phone);
        User agent = User.builder()
                .email(email)
                .phone(phone)
                .password(passwordEncoder.encode(password))
                .role(Role.AGENT)
                .accountStatus(AccountStatus.PENDING)
                .emailVerified(false)
                .phoneVerified(false)
                .active(true)
                .build();
        userRepository.save(agent);
        auditService.logAction(email != null ? email : phone, "AGENT_REGISTER");
        return agent;
    }

    public User registerAdmin(String email, String phone, String password) {
        validateUniqueUser(email, phone);
        User admin = User.builder()
                .email(email)
                .phone(phone)
                .password(passwordEncoder.encode(password))
                .role(Role.ADMIN)
                .accountStatus(AccountStatus.APPROVED)
                .emailVerified(false)
                .phoneVerified(false)
                .active(true)
                .build();
        userRepository.save(admin);
        auditService.logAction(email != null ? email : phone, "ADMIN_REGISTER");
        return admin;
    }

    private void validateUniqueUser(String email, String phone) {
        if (email == null && phone == null) throw new RuntimeException("Email or phone required");
        if (email != null && userRepository.existsByEmail(email)) throw new RuntimeException("Email already exists");
        if (phone != null && userRepository.existsByPhone(phone)) throw new RuntimeException("Phone already exists");
    }

    // ---------------- Login / Logout ----------------
    public AuthResponse login(String loginId, String password) {
        User user = userRepository.findByEmailOrPhone(loginId, loginId)
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            auditService.logAction(loginId, "LOGIN_FAILED");
            throw new RuntimeException("Invalid credentials");
        }

        if (!(Boolean.TRUE.equals(user.getEmailVerified()) || Boolean.TRUE.equals(user.getPhoneVerified()))) {
            throw new RuntimeException("Verify email or phone first");
        }
        if (!Boolean.TRUE.equals(user.getActive())) throw new RuntimeException("Account disabled");
        if (user.getAccountStatus() != AccountStatus.APPROVED)
            throw new RuntimeException("Account not approved");

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = refreshTokenService.createRefreshToken(user);
        auditService.logAction(loginId, "LOGIN_SUCCESS");

        return new AuthResponse(accessToken, refreshToken);
    }

    public boolean logout(String refreshToken) {
        if (refreshToken == null || refreshToken.isEmpty()) throw new IllegalArgumentException("Refresh token required");
        boolean valid = refreshTokenService.validateRefreshToken(refreshToken);
        if (valid) {
            refreshTokenService.revokeRefreshToken(refreshToken);
            auditService.logAction("UNKNOWN_USER", "LOGOUT");
            return true;
        }
        return false;
    }

    // ---------------- Password Management ----------------
    public void changePassword(User user, String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        auditService.logAction(user.getEmail() != null ? user.getEmail() : user.getPhone(), "PASSWORD_CHANGED");
    }

    public boolean checkPassword(User user, String rawPassword) {
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }

    public void invalidateOtherSessions(User user) {
        refreshTokenService.revokeAllUserTokens(user);
    }

    // ---------------- Forgot Password / OTP Flow ----------------
    public String createPasswordResetToken(User user) {
        String token = UUID.randomUUID().toString();
        PasswordResetToken prt = new PasswordResetToken(token, user.getId(), Instant.now().plusSeconds(600)); // 10 min
        passwordResetTokenStore.put(token, prt);
        return token;
    }

    public boolean validatePasswordResetToken(String token) {
        PasswordResetToken prt = passwordResetTokenStore.get(token);
        if (prt == null || prt.getExpiry().isBefore(Instant.now())) {
            passwordResetTokenStore.remove(token);
            return false;
        }
        return true;
    }

    public User getUserByPasswordResetToken(String token) {
        PasswordResetToken prt = passwordResetTokenStore.get(token);
        if (prt == null) throw new RuntimeException("Invalid token");
        return userRepository.findById(prt.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void invalidatePasswordResetToken(String token) {
        passwordResetTokenStore.remove(token);
    }

    public String generateAccessToken(User user) {
        return jwtService.generateAccessToken(user);
    }

    // ---------------- Internal Class ----------------
    private static class PasswordResetToken {
        private final String token;
        private final Long userId;
        private final Instant expiry;

        public PasswordResetToken(String token, Long userId, Instant expiry) {
            this.token = token;
            this.userId = userId;
            this.expiry = expiry;
        }

        public String getToken() { return token; }
        public Long getUserId() { return userId; }
        public Instant getExpiry() { return expiry; }
    }
}