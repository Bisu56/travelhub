package com.travelhub.payment;

import com.travelhub.entity.Payment;
import com.travelhub.entity.Refund;
import com.travelhub.entity.enums.PaymentStatus;
import com.travelhub.entity.enums.RefundStatus;
import com.travelhub.repository.PaymentRepository;
import com.travelhub.repository.RefundRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RefundService {

    private final PaymentRepository paymentRepository;
    private final RefundRepository refundRepository;
    private final StripeService stripeService;

    @Transactional
    public void refundPayment(Long paymentId, String reason) throws Exception {

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new IllegalStateException("Payment not found"));

        if (payment.getPaymentStatus() != PaymentStatus.PAID)
            throw new IllegalStateException("Only paid payments can be refunded");

        Refund refund = Refund.builder()
                .payment(payment)
                .reason(reason)
                .gateway(payment.getGateway())
                .status(RefundStatus.INITIATED)
                .createdAt(LocalDateTime.now())
                .build();

        refundRepository.save(refund);

        if ("STRIPE".equalsIgnoreCase(payment.getGateway())) {

            var stripeRefund = stripeService
                    .createRefund(payment.getGatewayTransactionId());

            refund.setGatewayRefundId(stripeRefund.getId());
            refund.setStatus(RefundStatus.SUCCESS);

            payment.setPaymentStatus(PaymentStatus.REFUNDED);
        }

        refundRepository.save(refund);
        paymentRepository.save(payment);
    }
}