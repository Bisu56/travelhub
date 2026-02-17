package com.travelhub.Service;
import com.travelhub.entity.AuditLog;
import com.travelhub.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class AuditService {

    private final AuditLogRepository auditLogRepository;

    public void logAction(String email, String action) {
        AuditLog log = AuditLog.builder()
                .email(email)
                .action(action)
                .timestamp(Instant.now())
                .build();
        auditLogRepository.save(log);
    }
}
