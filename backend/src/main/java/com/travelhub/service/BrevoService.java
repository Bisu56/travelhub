package com.travelhub.service;
import com.travelhub.config.BrevoConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BrevoService {

    private final BrevoConfig brevoConfig;
    private final WebClient webClient;

    public void sendEmail(String to, String subject, String htmlContent) {
        Map<String, Object> body = Map.of(
                "sender", Map.of(
                        "name", brevoConfig.getEmail().getSenderName(),
                        "email", brevoConfig.getEmail().getSenderEmail()
                ),
                "to", List.of(Map.of("email", to)),
                "subject", subject,
                "htmlContent", htmlContent
        );

        webClient.post()
                .uri("/smtp/email")
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class)
                .doOnError(err -> System.err.println("Failed to send email: " + err.getMessage()))
                .subscribe();
    }

    public void sendSms(String phone, String message) {
        Map<String, Object> body = Map.of(
                "sender", brevoConfig.getSmsSender(),
                "recipient", phone,
                "content", message
        );

        webClient.post()
                .uri("/sms?type=transactional")
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class)
                .doOnError(err -> System.err.println("Failed to send SMS: " + err.getMessage()))
                .subscribe();
    }
}
