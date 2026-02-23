package com.travelhub.controller;

import com.travelhub.Dtos.PaymentConfirmationDTO;
import com.travelhub.payment.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/webhook/stripe")
@RequiredArgsConstructor
public class StripeWebhookController {

    private final PaymentService paymentService;

    @Value("${stripe.webhook-secret}")
    private String endpointSecret;

    @PostMapping
    public void handleStripeEvent(@RequestBody String payload,
                                  @RequestHeader("Stripe-Signature") String sigHeader) throws Exception {

        var event = com.stripe.net.Webhook.constructEvent(payload, sigHeader, endpointSecret);

        if ("checkout.session.completed".equals(event.getType())) {
            var session = (com.stripe.model.checkout.Session) event.getDataObjectDeserializer()
                    .getObject().orElseThrow(() -> new IllegalStateException("Invalid session object"));

            PaymentConfirmationDTO dto = new PaymentConfirmationDTO();
            dto.setSessionId(session.getId());
            dto.setGatewayTransactionId(session.getPaymentIntent());
            dto.setSuccess(true);

            paymentService.markPaymentSuccess(dto);
        }
    }
}