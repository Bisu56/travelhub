package com.travelhub.service;

import com.travelhub.Dtos.PaymentInitiateResponseDTO;
import com.travelhub.entity.Cart;
import com.travelhub.entity.Payment;
import com.travelhub.entity.User;
import com.travelhub.entity.enums.CartStatus;
import com.travelhub.entity.enums.PaymentStatus;
import com.travelhub.payment.PaymentGateway;
import com.travelhub.repository.CartRepository;
import com.travelhub.repository.PaymentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
    @RequiredArgsConstructor
    public class PaymentService {

        private final PaymentRepository paymentRepository;
        private final CartRepository cartRepository;
        private final CartService cartService;
        private final List<PaymentGateway> gateways;

        @Transactional
        public PaymentInitiateResponseDTO initiatePayment(
                User user,
                Long cartId,
                String gatewayName
        ) throws Exception {

            Cart cart = cartRepository.findById(cartId)
                    .orElseThrow(() -> new IllegalStateException("Cart not found"));

            if (cart.getStatus() != CartStatus.CHECKED_OUT)
                throw new IllegalStateException("Cart not ready for payment");

            Payment payment = Payment.builder()
                    .cart(cart)
                    .user(user)
                    .amount(cart.getTotalAmount())
                    .currency("USD")
                    .gateway(gatewayName)
                    .paymentStatus(PaymentStatus.UNPAID)
                    .createdAt(LocalDateTime.now())
                    .build();

            paymentRepository.save(payment);

            PaymentGateway gateway = gateways.stream()
                    .filter(g -> g.getGatewayName().equalsIgnoreCase(gatewayName))
                    .findFirst()
                    .orElseThrow(() -> new IllegalStateException("Unsupported gateway"));

            var response = gateway.createPayment(payment);

            payment.setPaymentSessionId(response.getSessionId());
            paymentRepository.save(payment);

            return PaymentInitiateResponseDTO.builder()
                    .paymentUrl(response.getPaymentUrl())
                    .sessionId(response.getSessionId())
                    .build();
        }

        @Transactional
        public void markPaymentSuccess(String sessionId, String transactionId) {

            Payment payment = paymentRepository.findByPaymentSessionId(sessionId)
                    .orElseThrow(() -> new IllegalStateException("Payment not found"));

            payment.setPaymentStatus(PaymentStatus.PAID);
            payment.setGatewayTransactionId(transactionId);
            payment.setConfirmedAt(LocalDateTime.now());

            paymentRepository.save(payment);

            cartService.markCartCompleted(payment.getCart());
        }
    }
