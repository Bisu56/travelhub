package com.travelhub.payment;

import com.travelhub.entity.Payment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StripePaymentGateway implements PaymentGateway {

    private final StripeService stripeService;

    @Override
    public String getGatewayName() {
        return "STRIPE";
    }

    @Override
    public PaymentGatewayResponse createPayment(Payment payment) throws Exception {

        var session = stripeService.createCheckoutSession(
                payment.getAmount(),
                payment.getCurrency(),
                payment.getId().toString()
        );
        return PaymentGatewayResponse.builder()
                .paymentUrl(session.getUrl())
                .sessionId(session.getId())
                .build();
    }
}