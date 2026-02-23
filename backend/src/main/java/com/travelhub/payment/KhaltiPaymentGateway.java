package com.travelhub.payment;

import com.travelhub.entity.Payment;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class KhaltiPaymentGateway implements PaymentGateway {

    @Value("${khalti.secret-key}")
    private String secretKey;

    @Value("${khalti.return-url}")
    private String returnUrl;

    @Value("${khalti.website-url}")
    private String websiteUrl;

    @Override
    public String getGatewayName() {
        return "KHALTI";
    }

    @Override
    public PaymentGatewayResponse createPayment(Payment payment) {

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(secretKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = Map.of(
                "return_url", returnUrl,
                "website_url", websiteUrl,
                "amount", payment.getAmount().multiply(BigDecimal.valueOf(100)).intValue(),
                "purchase_order_id", payment.getId().toString(),
                "purchase_order_name", "TravelHub Booking"
        );

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                "https://a.khalti.com/api/v2/epayment/initiate/",
                HttpMethod.POST,
                request,
                Map.class
        );

        String paymentUrl = response.getBody() != null
                ? (String) response.getBody().get("payment_url")
                : null;

        return PaymentGatewayResponse.builder()
                .paymentUrl(paymentUrl)
                .sessionId(payment.getId().toString())
                .build();
    }
}