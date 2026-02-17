package com.travelhub.utils;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;
@Component
public class JwtUtils {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.access.expiration}")
    private long jwtAccessExpirationMs;

    @Value("${jwt.refresh.expiration}")
    private long jwtRefreshExpirationMs;

    // Generate Access Token
    public String generateAccessToken(String email, String role) {
        return generateToken(email, role, jwtAccessExpirationMs);
    }

    // Generate Refresh Token
    public String generateRefreshToken(String email, String role) {
        return generateToken(email, role, jwtRefreshExpirationMs);
    }

    // Internal method to generate a token with given expiration
    private String generateToken(String email, String role, long expirationMs) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(SignatureAlgorithm.HS256, jwtSecret)
                .compact();
    }

    // Validate token
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            return false;
        }
    }

    // Extract email (subject) from token
    public String getEmailFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Extract role from token
    public String getRoleFromToken(String token) {
        return (String) Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody()
                .get("role");
    }
}
