package com.travelhub.scheduler;
import com.travelhub.entity.Payment;
import com.travelhub.entity.enums.CartStatus;
import com.travelhub.entity.enums.PaymentStatus;
import com.travelhub.repository.PaymentRepository;
import com.travelhub.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class PaymentTimeoutScheduler {

    private final PaymentRepository paymentRepository;
    private final CartRepository cartRepository;

    @Scheduled(fixedRate = 300000)
    public void expireUnpaidPayments() {

        LocalDateTime threshold = LocalDateTime.now().minusMinutes(30);

        List<Payment> expiredPayments =
                paymentRepository.findByPaymentStatusAndCreatedAtBefore(
                        PaymentStatus.UNPAID,
                        threshold
                );

        for (Payment payment : expiredPayments) {

            payment.setPaymentStatus(PaymentStatus.FAILED);
            payment.setFailureReason("Payment timeout");

            payment.getCart().setStatus(CartStatus.ACTIVE);

            paymentRepository.save(payment);
            cartRepository.save(payment.getCart());
        }
    }
}