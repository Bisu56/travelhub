package com.travelhub.payment;

import com.travelhub.Dtos.PaymentConfirmationDTO;
import com.travelhub.entity.Payment;
import com.travelhub.config.KhaltiConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.Map;
@Service
@RequiredArgsConstructor
public class KhaltiPaymentGateway implements PaymentGateway {

    private final KhaltiConfig config;
    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public String getGatewayName() {
        return "KHALTI";
    }

    @Override
    public PaymentGatewayResponse createPayment(Payment payment) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(config.getSecretKey());
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = Map.of(
                "return_url", config.getReturnUrl(),
                "website_url", config.getWebsiteUrl(),
                "amount", payment.getAmount().multiply(BigDecimal.valueOf(100)).intValue(),
                "purchase_order_id", payment.getId().toString(),
                "purchase_order_name", "TravelHub Booking"
        );

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
        Map<String, Object> response = restTemplate.postForObject(
                "https://a.khalti.com/api/v2/epayment/initiate/",
                request,
                Map.class
        );

        String paymentUrl = response != null ? (String) response.get("payment_url") : null;

        return PaymentGatewayResponse.builder()
                .paymentUrl(paymentUrl)
                .sessionId(payment.getId().toString())
                .build();
    }

    @Override
    public void verifyPayment(PaymentConfirmationDTO dto) throws Exception {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(config.getSecretKey());
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = Map.of(
                "token", dto.getGatewayTransactionId(),
                "amount", Integer.parseInt(dto.getSessionId()) // adapt if necessary
        );

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
        Map<String, Object> response = restTemplate.postForObject(
                "https://khalti.com/api/v2/payment/verify/",
                request,
                Map.class
        );

        boolean success = response != null && response.containsKey("idx");
        dto.setSuccess(success);
    }

    /**
     * Admin-triggered refund for Khalti payments
     */
    public boolean refundPayment(String transactionId, BigDecimal amount) throws Exception {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(config.getSecretKey());
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = Map.of(
                "transaction_id", transactionId,
                "amount", amount.multiply(BigDecimal.valueOf(100)).intValue() // amount in paisa
        );

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
        Map<String, Object> response = restTemplate.postForObject(
                "https://khalti.com/api/v2/payment/refund/",
                request,
                Map.class
        );

        // If Khalti returns a success key, mark refund as successful
        return response != null && response.containsKey("status") && "success".equalsIgnoreCase(response.get("status").toString());
    }
}