package com.travelhub.payment;

import com.travelhub.Dtos.PaymentConfirmationDTO;
import com.travelhub.Dtos.PaymentInitiateResponseDTO;
import com.travelhub.entity.Cart;
import com.travelhub.entity.Payment;
import com.travelhub.entity.User;
import com.travelhub.entity.enums.CartStatus;
import com.travelhub.entity.enums.PaymentStatus;
import com.travelhub.repository.CartRepository;
import com.travelhub.repository.PaymentRepository;
import com.travelhub.service.CartService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final CartRepository cartRepository;
    private final CartService cartService;
    private final List<PaymentGateway> gateways;

    private static final Logger log = LoggerFactory.getLogger(PaymentService.class);

    @Transactional
    public PaymentInitiateResponseDTO initiatePayment(User user, Long cartId, String gatewayName) throws Exception {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new IllegalStateException("Cart not found"));

        if (cart.getStatus() != CartStatus.CHECKED_OUT)
            throw new IllegalStateException("Cart not ready for payment");

        Optional<Payment> existingPayment = paymentRepository.findByCartId(cartId);
        if (existingPayment.isPresent()) {
            Payment payment = existingPayment.get();
            log.info("Returning existing payment session for cart {}", cartId);
            return PaymentInitiateResponseDTO.builder()
                    .paymentUrl(null)
                    .sessionId(payment.getPaymentSessionId())
                    .build();
        }

        Payment payment = Payment.builder()
                .cart(cart)
                .user(user)
                .amount(cart.getTotalAmount())
                .currency("NRS")
                .gateway(gatewayName)
                .paymentStatus(PaymentStatus.UNPAID)
                .createdAt(LocalDateTime.now())
                .build();

        paymentRepository.save(payment);

        PaymentGateway gateway = gateways.stream()
                .filter(g -> g.getGatewayName().equalsIgnoreCase(gatewayName))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("Unsupported gateway"));

        try {
            PaymentGatewayResponse response = gateway.createPayment(payment);
            payment.setPaymentSessionId(response.getSessionId());
            paymentRepository.save(payment);

            log.info("Payment initiated for cart {} via {}", cartId, gatewayName);
            return PaymentInitiateResponseDTO.builder()
                    .paymentUrl(response.getPaymentUrl())
                    .sessionId(response.getSessionId())
                    .build();
        } catch (Exception e) {
            log.error("Payment initiation failed for cart {}: {}", cartId, e.getMessage());
            throw e;
        }
    }

    /** Mark payment as success/failure for any gateway */
    @Transactional
    public void markPaymentSuccess(PaymentConfirmationDTO confirmation) {
        Optional<Payment> opt = paymentRepository.findByPaymentSessionId(confirmation.getSessionId());
        if (opt.isEmpty()) {
            log.warn("Payment session {} not found", confirmation.getSessionId());
            return;
        }

        Payment payment = opt.get();

        // Idempotency: skip if already processed
        if (payment.getPaymentStatus() == PaymentStatus.PAID) {
            log.info("Payment {} already marked as PAID", payment.getId());
            return;
        }

        payment.setPaymentStatus(confirmation.isSuccess() ? PaymentStatus.PAID : PaymentStatus.FAILED);
        payment.setGatewayTransactionId(confirmation.getGatewayTransactionId());
        payment.setConfirmedAt(LocalDateTime.now());

        paymentRepository.save(payment);

        if (confirmation.isSuccess()) {
            cartService.markCartCompleted(payment.getCart());
        }

        log.info("Payment {} marked as {}", payment.getId(), payment.getPaymentStatus());
    }
}