package com.travelhub.controller;

import com.travelhub.Dtos.PaymentConfirmationDTO;
import com.travelhub.payment.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api/webhook/khalti")
@RequiredArgsConstructor
public class KhaltiWebhookController {

    private final PaymentService paymentService;

    @PostMapping("/verify")
    public ResponseEntity<String> verifyPayment(
            @RequestParam String token,
            @RequestParam String amount,
            @RequestParam Long paymentId
    ) {

        // Prepare verification request to Khalti
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://khalti.com/api/v2/payment/verify/";

        Map<String, Object> body = Map.of(
                "token", token,
                "amount", Integer.parseInt(amount) // amount in paisa
        );

        // Add authorization header
        org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.setBearerAuth("SECRET_KEY"); // replace dynamically or inject via config
        headers.set("Content-Type", "application/json");

        org.springframework.http.HttpEntity<Map<String, Object>> request = new org.springframework.http.HttpEntity<>(body, headers);

        Map<String, Object> response = restTemplate.postForObject(url, request, Map.class);

        boolean success = response != null && response.containsKey("idx");

        PaymentConfirmationDTO dto = new PaymentConfirmationDTO();
        dto.setSessionId(paymentId.toString());
        dto.setGatewayTransactionId(success ? response.get("idx").toString() : null);
        dto.setSuccess(success);

        paymentService.markPaymentSuccess(dto);

        return ResponseEntity.ok(success ? "Payment Verified" : "Payment Failed");
    }
}