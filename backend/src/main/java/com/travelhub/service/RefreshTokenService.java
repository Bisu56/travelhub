package com.travelhub.service;
import com.travelhub.entity.RefreshToken;
import com.travelhub.entity.User;
import com.travelhub.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    private final long refreshTokenDuration = 86400000; // 1 day

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
            refreshTokenRepository.save(t);
        });
    }

    public boolean validateRefreshToken(String token) {
        return refreshTokenRepository.findByToken(token)
                .filter(t -> !t.isRevoked() && !t.isUsed() && t.getExpiryDate().isAfter(Instant.now()))
                .isPresent();
    }
}
