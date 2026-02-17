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
        if(email != null && userRepository.existsByEmail(email))
            throw new RuntimeException("Email already exists");
        if(phone != null && userRepository.existsByPhone(phone))
            throw new RuntimeException("Phone already exists");
        if(email == null && phone == null)
            throw new RuntimeException("Either email or phone must be provided");

        User user = User.builder()
                .email(email)
                .phone(phone)
                .password(passwordEncoder.encode(password))
                .role(Role.USER)
                .accountStatus(AccountStatus.APPROVED)
                .emailVerified(email == null ? false : false)
                .phoneVerified(phone == null ? false : false)
                .build();

        User savedUser = userRepository.save(user);
        auditService.logAction(email != null ? email : phone, "USER_REGISTER");
        return savedUser;
    }

    public User registerAgent(String email, String phone, String password) {
        if(email != null && userRepository.existsByEmail(email))
            throw new RuntimeException("Email already exists");
        if(phone != null && userRepository.existsByPhone(phone))
            throw new RuntimeException("Phone already exists");
        if(email == null && phone == null)
            throw new RuntimeException("Either email or phone must be provided");

        User agent = User.builder()
                .email(email)
                .phone(phone)
                .password(passwordEncoder.encode(password))
                .role(Role.AGENT)
                .accountStatus(AccountStatus.PENDING) // Pending admin approval
                .emailVerified(email == null ? false : false)
                .phoneVerified(phone == null ? false : false)
                .build();

        User savedAgent = userRepository.save(agent);
        auditService.logAction(email != null ? email : phone, "AGENT_REGISTER");
        return savedAgent;
    }

    public User registerAdmin(String email, String phone, String password) {
        if(email != null && userRepository.existsByEmail(email))
            throw new RuntimeException("Email already exists");
        if(phone != null && userRepository.existsByPhone(phone))
            throw new RuntimeException("Phone already exists");
        if(email == null && phone == null)
            throw new RuntimeException("Either email or phone must be provided");

        User admin = User.builder()
                .email(email)
                .phone(phone)
                .password(passwordEncoder.encode(password))
                .role(Role.ADMIN)
                .accountStatus(AccountStatus.APPROVED)
                .emailVerified(email == null ? false : false)
                .phoneVerified(phone == null ? false : false)
                .build();

        User savedAdmin = userRepository.save(admin);
        auditService.logAction(email != null ? email : phone, "ADMIN_REGISTER");
        return savedAdmin;
    }

    public AuthResponse login(String emailOrPhone, String password) {
        User user = (emailOrPhone.contains("@"))
                ? userRepository.findByEmail(emailOrPhone)
                .orElseThrow(() -> new RuntimeException("Invalid credentials"))
                : userRepository.findByPhone(emailOrPhone)
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if(!passwordEncoder.matches(password, user.getPassword())) {
            auditService.logAction(emailOrPhone, "LOGIN_FAILED");
            throw new RuntimeException("Invalid credentials");
        }

        if(user.getAccountStatus() != AccountStatus.APPROVED) {
            throw new RuntimeException("Account not approved yet");
        }

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = refreshTokenService.createRefreshToken(user);

        auditService.logAction(emailOrPhone, "LOGIN_SUCCESS");
        return new AuthResponse(accessToken, refreshToken);
    }
}
