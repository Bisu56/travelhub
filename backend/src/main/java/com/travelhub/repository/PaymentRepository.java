package com.travelhub.repository;

import com.travelhub.entity.Payment;
import com.travelhub.entity.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByPaymentSessionId(String sessionId);
    Optional<Payment> findByCartId(Long cartId);
    List<Payment> findByPaymentStatusAndCreatedAtBefore(
            PaymentStatus status,
            LocalDateTime time
    );
    Optional<Payment> findByGatewayTransactionId(String transactionId);
}