package com.travelhub.service;
import com.travelhub.entity.AuditLog;
import com.travelhub.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
@Service
@RequiredArgsConstructor
public class AuditService {

    private final AuditLogRepository auditLogRepository;

    // For admin actions without IP
    public void logAdminAction(String action) {
        AuditLog log = AuditLog.builder()
                .email(null)
                .action(action)
                .ipAddress(null)
                .timestamp(Instant.now())
                .build();
        auditLogRepository.save(log);
    }

    // For user/admin actions with email + IP
    public void log(String email, String action, String ip) {
        AuditLog log = AuditLog.builder()
                .email(email)
                .action(action)
                .ipAddress(ip)
                .timestamp(Instant.now())
                .build();
        auditLogRepository.save(log);
    }

    // For user action without IP
    public void logAction(String email, String action) {
        log(email, action, null);
    }
}
