package com.travelhub.service;

import com.travelhub.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
@RequiredArgsConstructor
public class RefreshTokenCleanup {

    private final RefreshTokenRepository refreshTokenRepository;

    @Scheduled(cron = "0 0 2 * * ?")
    public void cleanupExpiredTokens() {
        Instant now = Instant.now();
        refreshTokenRepository.findAll().stream()
                .filter(t -> t.getExpiryDate().isBefore(now) || t.isRevoked())
                .forEach(refreshTokenRepository::delete);
    }
}