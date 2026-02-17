package com.travelhub.service;
import com.travelhub.entity.User;
import com.travelhub.entity.enums.AccountStatus;
import com.travelhub.entity.enums.Role;
import com.travelhub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Fetch user by ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Update user profile
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

        private final OtpService otpService;

        public Optional<User> getUserByEmail(String email) {
            return userRepository.findByEmail(email);
        }

        public Optional<User> getUserByPhone(String phone) {
            return userRepository.findByPhone(phone);
        }

        public User saveUser(User user) {
            return userRepository.save(user);
        }

        // Unified OTP verification
        public boolean verifyOtp(User user, String otp, String type) {
            boolean result = false;
            if("email".equalsIgnoreCase(type)) {
                result = otpService.verifyEmailOtp(user, otp);
                if(result) user.setEmailVerified(true);
            } else if("phone".equalsIgnoreCase(type)) {
                result = otpService.verifyPhoneOtp(user, otp);
                if(result) user.setPhoneVerified(true);
            }

            // Auto-approve user if any verified field is completed
            if(user.getRole() == Role.USER) {
                if((user.getEmail() != null && user.getEmailVerified()) ||
                        (user.getPhone() != null && user.getPhoneVerified())) {
                    user.setAccountStatus(AccountStatus.APPROVED);
                }
            }
            saveUser(user);
            return result;
        }
    }
