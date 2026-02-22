package com.travelhub.service;

import com.travelhub.entity.RefreshToken;
import com.travelhub.entity.User;
import com.travelhub.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final AuditService auditService;

    private final long refreshTokenDuration = 86400000;

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

    public void revokeRefreshToken(String token) {
        refreshTokenRepository.findByToken(token).ifPresent(t -> {
            t.setRevoked(true);
            t.setUsed(true);
            refreshTokenRepository.save(t);
            auditService.logAction(t.getUser().getEmail() != null ? t.getUser().getEmail() : t.getUser().getPhone(),
                    "REFRESH_TOKEN_REVOKED");
        });
    }

    public boolean validateRefreshToken(String token) {
        return refreshTokenRepository.findByToken(token)
                .filter(t -> !t.isRevoked() && !t.isUsed() && t.getExpiryDate().isAfter(Instant.now()))
                .isPresent();
    }

    public User getUserFromToken(String token) {
        return refreshTokenRepository.findByToken(token)
                .map(RefreshToken::getUser)
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));
    }

    public void revokeAllUserTokens(User user) {
        List<RefreshToken> tokens = refreshTokenRepository.findAllByUserAndRevokedFalseAndUsedFalse(user);
        for (RefreshToken t : tokens) {
            t.setRevoked(true);
            t.setUsed(true);
        }
        refreshTokenRepository.saveAll(tokens);
        auditService.logAction(user.getEmail() != null ? user.getEmail() : user.getPhone(),
                "ALL_USER_TOKENS_REVOKED");
    }
}