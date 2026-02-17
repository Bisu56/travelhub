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

    // Register USER
    public User registerUser(String email, String phone, String password) {
        if(userRepository.existsByEmail(email)) throw new RuntimeException("Email already exists");
        if(userRepository.existsByPhone(phone)) throw new RuntimeException("Phone already exists");

        User user = User.builder()
                .email(email)
                .phone(phone)
                .password(passwordEncoder.encode(password))
                .role(Role.USER)
                .accountStatus(AccountStatus.APPROVED)
                .build();

        User savedUser = userRepository.save(user);
        auditService.logAction(email, "USER_REGISTER");
        return savedUser;
    }

    // Register AGENT (pending approval)
    public User registerAgent(String email, String phone, String password) {
        if(userRepository.existsByEmail(email)) throw new RuntimeException("Email already exists");
        if(userRepository.existsByPhone(phone)) throw new RuntimeException("Phone already exists");

        User agent = User.builder()
                .email(email)
                .phone(phone)
                .password(passwordEncoder.encode(password))
                .role(Role.AGENT)
                .accountStatus(AccountStatus.PENDING)
                .build();

        User savedAgent = userRepository.save(agent);
        auditService.logAction(email, "AGENT_REGISTER");
        return savedAgent;
    }

    // Register ADMIN
    public User registerAdmin(String email, String phone, String password) {
        if(userRepository.existsByEmail(email)) throw new RuntimeException("Email already exists");
        if(userRepository.existsByPhone(phone)) throw new RuntimeException("Phone already exists");

        User admin = User.builder()
                .email(email)
                .phone(phone)
                .password(passwordEncoder.encode(password))
                .role(Role.ADMIN)
                .accountStatus(AccountStatus.APPROVED)
                .build();

        User savedAdmin = userRepository.save(admin);
        auditService.logAction(email, "ADMIN_REGISTER");
        return savedAdmin;
    }

    // Login
    public AuthResponse login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if(!passwordEncoder.matches(password, user.getPassword())) {
            auditService.logAction(email, "LOGIN_FAILED");
            throw new RuntimeException("Invalid credentials");
        }

        if(user.getAccountStatus() != AccountStatus.APPROVED) {
            throw new RuntimeException("Account not approved yet");
        }

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = refreshTokenService.createRefreshToken(user);

        auditService.logAction(email, "LOGIN_SUCCESS");

        return new AuthResponse(accessToken, refreshToken);
    }
}
