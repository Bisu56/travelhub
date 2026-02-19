package com.travelhub.service;
import com.travelhub.entity.User;
import com.travelhub.entity.enums.AccountStatus;
import com.travelhub.entity.enums.Role;
import com.travelhub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final OtpService otpService;

    // Get user by ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Get user by email
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Get user by phone
    public Optional<User> getUserByPhone(String phone) {
        return userRepository.findByPhone(phone);
    }

    // Save user
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // Update profile
    public User updateProfile(Long userId, User updatedUser) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        user.setPhone(updatedUser.getPhone());
        return userRepository.save(user);
    }

    // Change password
    public void changePassword(Long userId, String oldPassword, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Old password incorrect");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    // Unified OTP verification
    public boolean verifyOtp(User user, String otp, String type) {
        boolean result = false;

        if ("email".equalsIgnoreCase(type)) {
            result = otpService.verifyEmailOtp(user, otp);
            if (result) user.setEmailVerified(true);
        } else if ("phone".equalsIgnoreCase(type)) {
            result = otpService.verifyPhoneOtp(user, otp);
            if (result) user.setPhoneVerified(true);
        }

        // Approve account for regular users if verified
        if (user.getRole() == Role.USER) {
            if ((user.getEmail() != null && user.getEmailVerified()) ||
                    (user.getPhone() != null && user.getPhoneVerified())) {
                user.setAccountStatus(AccountStatus.APPROVED);
            }
        }

        saveUser(user);
        return result;
    }

    // Fetch current logged-in user from Authentication
    public User getCurrentUser(Authentication auth) {
        if (auth == null || !auth.isAuthenticated()) {
            throw new RuntimeException("Unauthenticated");
        }

        Object principal = auth.getPrincipal();
        String emailOrPhone;

        if (principal instanceof UserDetails userDetails) {
            emailOrPhone = userDetails.getUsername();
        } else if (principal instanceof String str) {
            emailOrPhone = str;
        } else {
            throw new RuntimeException("Unknown principal type");
        }

        return userRepository.findByEmail(emailOrPhone)
                .or(() -> userRepository.findByPhone(emailOrPhone))
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
