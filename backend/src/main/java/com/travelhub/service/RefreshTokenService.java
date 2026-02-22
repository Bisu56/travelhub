package com.travelhub.service;

import com.travelhub.entity.RefreshToken;
import com.travelhub.entity.User;
import com.travelhub.repository.RefreshTokenRepository;
import com.travelhub.service.AuditService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final AuditService auditService;

    // 1 day by default (ms)
    private final long refreshTokenDuration = 86400000;

    // Create new refresh token
    public String createRefreshToken(User user) {
        RefreshToken token = RefreshToken.builder()
                .token(UUID.randomUUID().toString())
                .user(user)
                .expiryDate(Instant.now().plusMillis(refreshTokenDuration))
                .revoked(false)
                .used(false)
                .build();

        refreshTokenRepository.save(token);
        return token.getToken();
    }

    // Revoke / mark old token as used
    public void revokeRefreshToken(String token) {
        refreshTokenRepository.findByToken(token).ifPresent(t -> {
            t.setRevoked(true);
            t.setUsed(true);
            refreshTokenRepository.save(t);
        });
    }

    // Validate refresh token
    public boolean validateRefreshToken(String token) {
        return refreshTokenRepository.findByToken(token)
                .filter(t -> !t.isRevoked() && !t.isUsed() && t.getExpiryDate().isAfter(Instant.now()))
                .isPresent();
    }

    // Get user from refresh token
    public User getUserFromToken(String token) {
        return refreshTokenRepository.findByToken(token)
                .map(RefreshToken::getUser)
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));
    }
}