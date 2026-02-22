package com.travelhub.controller;

import com.travelhub.Dtos.AuthResponse;
import com.travelhub.Dtos.RefreshRequest;
import com.travelhub.entity.User;
import com.travelhub.service.AuthService;
import com.travelhub.service.RefreshTokenService;
import com.travelhub.service.AuditService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class RefreshController {

    private final RefreshTokenService refreshTokenService;
    private final AuthService authService;
    private final AuditService auditService;

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshAccessToken(@RequestBody RefreshRequest request) {
        String refreshToken = request.getRefreshToken();

        // Validate token
        if (!refreshTokenService.validateRefreshToken(refreshToken)) {
            return ResponseEntity.status(401).body(new AuthResponse("Invalid or expired refresh token", null));
        }

        // Get user
        User user = refreshTokenService.getUserFromToken(refreshToken);

        // Audit logging
        auditService.logAction(user.getEmail() != null ? user.getEmail() : user.getPhone(), "REFRESH_TOKEN_USED");

        // Revoke old token
        refreshTokenService.revokeRefreshToken(refreshToken);

        // Issue new tokens
        String newAccessToken = authService.generateAccessToken(user);
        String newRefreshToken = refreshTokenService.createRefreshToken(user);

        return ResponseEntity.ok(new AuthResponse(newAccessToken, newRefreshToken));
    }
}