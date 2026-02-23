package com.travelhub.repository;

import com.travelhub.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByPaymentSessionId(String sessionId);
    Optional<Payment> findByCartId(Long cartId);

    Optional<Payment> findByGatewayTransactionId(String transactionId);
}