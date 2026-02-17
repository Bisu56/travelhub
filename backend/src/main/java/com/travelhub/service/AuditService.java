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

    // Log action without email (admin actions)
    public void logAdminAction(String action) {
        AuditLog log = AuditLog.builder()
                .email(null)   // Optional: no email for admin actions
                .action(action)
                .timestamp(Instant.now())
                .build();
        auditLogRepository.save(log);
    }

    // Log action with email (user actions)
    public void logAction(String email, String action) {
        AuditLog log = AuditLog.builder()
                .email(email)
                .action(action)
                .timestamp(Instant.now())
                .build();
        auditLogRepository.save(log);
    }
}
