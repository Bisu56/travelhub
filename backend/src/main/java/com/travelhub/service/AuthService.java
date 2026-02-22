package com.travelhub.service;
import com.travelhub.Dtos.AuthResponse;
import com.travelhub.entity.User;
import com.travelhub.entity.enums.AccountStatus;
import com.travelhub.entity.enums.Role;
import com.travelhub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final AuditService auditService;

    public User registerUser(String email, String phone, String password) {

        if (email == null && phone == null)
            throw new RuntimeException("Either email or phone must be provided");

        if (email != null && userRepository.existsByEmail(email))
            throw new RuntimeException("Email already exists");

        if (phone != null && userRepository.existsByPhone(phone))
            throw new RuntimeException("Phone already exists");

        User user = User.builder()
                .email(email)
                .phone(phone)
                .password(passwordEncoder.encode(password))
                .role(Role.USER)
                .accountStatus(AccountStatus.PENDING) // MUST be pending
                .emailVerified(false)
                .phoneVerified(false)
                .build();

        User saved = userRepository.save(user);
        auditService.logAction(email != null ? email : phone, "USER_REGISTER");
        return saved;
    }


    public User registerAgent(String email, String phone, String password) {

        if (email == null && phone == null)
            throw new RuntimeException("Either email or phone must be provided");

        if (email != null && userRepository.existsByEmail(email))
            throw new RuntimeException("Email already exists");

        if (phone != null && userRepository.existsByPhone(phone))
            throw new RuntimeException("Phone already exists");

        User agent = User.builder()
                .email(email)
                .phone(phone)
                .password(passwordEncoder.encode(password))
                .role(Role.AGENT)
                .accountStatus(AccountStatus.PENDING)
                .emailVerified(false)
                .phoneVerified(false)
                .build();

        User saved = userRepository.save(agent);
        auditService.logAction(email != null ? email : phone, "AGENT_REGISTER");
        return saved;
    }


    public User registerAdmin(String email, String phone, String password) {

        if (email == null && phone == null)
            throw new RuntimeException("Either email or phone must be provided");

        if (email != null && userRepository.existsByEmail(email))
            throw new RuntimeException("Email already exists");

        if (phone != null && userRepository.existsByPhone(phone))
            throw new RuntimeException("Phone already exists");

        User admin = User.builder()
                .email(email)
                .phone(phone)
                .password(passwordEncoder.encode(password))
                .role(Role.ADMIN)
                .accountStatus(AccountStatus.APPROVED) // Admin auto-approved
                .emailVerified(false)
                .phoneVerified(false)
                .build();

        User saved = userRepository.save(admin);
        auditService.logAction(email != null ? email : phone, "ADMIN_REGISTER");
        return saved;
    }


    public void activateUser(User user) {
        user.setAccountStatus(AccountStatus.APPROVED);
        userRepository.save(user);
    }
    public AuthResponse login(String loginId, String password) {

        if (loginId == null || loginId.isBlank())
            throw new RuntimeException("Email or phone must be provided");

        User user = userRepository
                .findByEmailOrPhone(loginId, loginId)
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            auditService.logAction(loginId, "LOGIN_FAILED");
            throw new RuntimeException("Invalid credentials");
        }

        boolean verified = Boolean.TRUE.equals(user.getEmailVerified())
                || Boolean.TRUE.equals(user.getPhoneVerified());

        if (!verified)
            throw new RuntimeException("Verify email or phone first");

        if (!Boolean.TRUE.equals(user.getActive()))
            throw new RuntimeException("Account disabled");

        if (user.getAccountStatus() != AccountStatus.APPROVED)
            throw new RuntimeException("Account not approved");

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = refreshTokenService.createRefreshToken(user);

        auditService.logAction(loginId, "LOGIN_SUCCESS");

        return new AuthResponse(accessToken, refreshToken);


    }

        public boolean logout(String refreshToken) {
            if (refreshToken == null || refreshToken.isEmpty()) {
                throw new IllegalArgumentException("Refresh token is required for logout");
            }

            boolean exists = refreshTokenService.validateRefreshToken(refreshToken);
            if (exists) {
                refreshTokenService.revokeRefreshToken(refreshToken);
                auditService.logAction("UNKNOWN_USER", "LOGOUT");
                return true;
            }


            return false;
        }
    public String generateAccessToken(User user) {
        return jwtService.generateAccessToken(user);
    }

    }


