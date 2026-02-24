package com.travelhub.controller;

import com.travelhub.Dtos.PaymentConfirmationDTO;
import com.travelhub.payment.KhaltiPaymentGateway;
import com.travelhub.payment.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/webhook/khalti")
@RequiredArgsConstructor
public class KhaltiWebhookController {

    private final PaymentService paymentService;
    private final KhaltiPaymentGateway khaltiGateway;

    @PostMapping("/verify")
    public ResponseEntity<String> verifyPayment(
            @RequestParam String token,
            @RequestParam String amount,
            @RequestParam Long paymentId
    ) {
        try {
            PaymentConfirmationDTO dto = new PaymentConfirmationDTO();
            dto.setSessionId(paymentId.toString());
            dto.setGatewayTransactionId(token);

            // Use KhaltiPaymentGateway to verify
            khaltiGateway.verifyPayment(dto);

            // Mark payment in your system
            paymentService.markPaymentSuccess(dto);

            return ResponseEntity.ok(dto.isSuccess() ? "Payment Verified" : "Payment Failed");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Payment Verification Error: " + e.getMessage());
        }
    }
}