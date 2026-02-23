package com.travelhub.payment;

import com.travelhub.entity.Payment;
import com.travelhub.entity.Refund;
import com.travelhub.entity.enums.PaymentStatus;
import com.travelhub.entity.enums.RefundStatus;
import com.travelhub.entity.User;
import com.travelhub.entity.enums.Role;
import com.travelhub.repository.PaymentRepository;
import com.travelhub.repository.RefundRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RefundService {

    private final PaymentRepository paymentRepository;
    private final RefundRepository refundRepository;
    private final StripeService stripeService;
    private final KhaltiPaymentGateway khaltiGateway;

    private static final Logger log = LoggerFactory.getLogger(RefundService.class);

    @Transactional
    public Refund requestRefund(User user, Long paymentId, String reason) {

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new IllegalStateException("Payment not found"));

        if (payment.getPaymentStatus() != PaymentStatus.PAID) {
            throw new IllegalStateException("Only paid payments can be requested for refund");
        }

        Refund refund = Refund.builder()
                .payment(payment)
                .requestedBy(user)
                .reason(reason)
                .status(RefundStatus.REQUESTED)
                .gateway(payment.getGateway())
                .createdAt(LocalDateTime.now())
                .build();

        refundRepository.save(refund);
        log.info("Refund requested for payment {} by user {}", paymentId, user.getId());
        return refund;
    }


    @Transactional
    public void executeRefund(User admin, Long refundId) throws Exception {

        if (admin.getRole() != Role.ADMIN) {
            throw new IllegalStateException("Only ADMIN can execute refunds");
        }

        Refund refund = refundRepository.findById(refundId)
                .orElseThrow(() -> new IllegalStateException("Refund request not found"));

        Payment payment = refund.getPayment();

        if (payment.getPaymentStatus() == PaymentStatus.REFUNDED) {
            log.info("Payment {} already refunded", payment.getId());
            refund.setStatus(RefundStatus.SUCCESS);
            refundRepository.save(refund);
            return;
        }

        try {
            switch (payment.getGateway().toUpperCase()) {
                case "STRIPE":
                    var stripeRefund = stripeService.createRefund(payment.getGatewayTransactionId());
                    refund.setGatewayRefundId(stripeRefund.getId());
                    refund.setStatus(RefundStatus.SUCCESS);
                    payment.setPaymentStatus(PaymentStatus.REFUNDED);
                    log.info("Stripe refund executed for payment {}", payment.getId());
                    break;

                case "KHALTI":
                    boolean success = khaltiGateway.refundPayment(payment.getGatewayTransactionId(), payment.getAmount());
                    if (success) {
                        refund.setGatewayRefundId(payment.getGatewayTransactionId());
                        refund.setStatus(RefundStatus.SUCCESS);
                        payment.setPaymentStatus(PaymentStatus.REFUNDED);
                        log.info("Khalti refund executed for payment {}", payment.getId());
                    } else {
                        refund.setStatus(RefundStatus.FAILED);
                        log.warn("Khalti refund failed for payment {}", payment.getId());
                    }
                    break;

                default:
                    throw new IllegalStateException("Unsupported gateway: " + payment.getGateway());
            }

            refundRepository.save(refund);
            paymentRepository.save(payment);

        } catch (Exception e) {
            log.error("Refund execution failed for payment {}: {}", payment.getId(), e.getMessage());
            throw e;
        }
    }
}