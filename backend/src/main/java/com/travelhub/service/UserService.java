package com.travelhub.service;

import com.travelhub.Dtos.UserProfileDTO;
import com.travelhub.entity.User;
import com.travelhub.entity.enums.AccountStatus;
import com.travelhub.entity.enums.Role;
import com.travelhub.repository.UserRepository;
import jakarta.transaction.Transactional;
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

    // ------------------- Basic CRUD -------------------

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> getUserByPhone(String phone) {
        return userRepository.findByPhone(phone);
    }

    public Optional<User> getByEmailOrPhone(String emailOrPhone) {
        if (emailOrPhone.contains("@")) {
            return userRepository.findByEmail(emailOrPhone);
        } else {
            return userRepository.findByPhone(emailOrPhone);
        }
    }

    @Transactional
    public User saveUser(User user) {
        return userRepository.save(user);
    }


    @Transactional
    public void updateProfile(User user, UserProfileDTO dto) {
        dto.updateUser(user);  // maps DTO fields to User entity
        userRepository.save(user);
    }


    @Transactional
    public void changePassword(User user, String oldPassword, String newPassword) {
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    public boolean checkPassword(User user, String rawPassword) {
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }


    @Transactional
    public boolean verifyOtp(User user, String otp, String type) {
        boolean verified = false;

        if ("email".equalsIgnoreCase(type)) {
            verified = otpService.verifyEmailOtp(user, otp);
            if (verified) user.setEmailVerified(true);
        } else if ("phone".equalsIgnoreCase(type)) {
            verified = otpService.verifyPhoneOtp(user, otp);
            if (verified) user.setPhoneVerified(true);
        }

        // Update account status based on role and verification
        updateAccountStatusAfterVerification(user);

        userRepository.save(user);
        return verified;
    }

    private void updateAccountStatusAfterVerification(User user) {
        switch (user.getRole()) {
            case USER -> {
                if ((user.getEmail() != null && Boolean.TRUE.equals(user.getEmailVerified())) ||
                        (user.getPhone() != null && Boolean.TRUE.equals(user.getPhoneVerified()))) {
                    user.setAccountStatus(AccountStatus.APPROVED);
                }
            }
            case AGENT -> {
                if ((user.getEmail() != null && Boolean.TRUE.equals(user.getEmailVerified())) ||
                        (user.getPhone() != null && Boolean.TRUE.equals(user.getPhoneVerified()))) {
                    user.setAccountStatus(AccountStatus.PENDING); // admin approves later
                }
            }
            case ADMIN -> user.setAccountStatus(AccountStatus.APPROVED);
        }
    }


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