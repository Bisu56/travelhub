package com.travelhub.Dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaymentInitiateResponseDTO {
    private String paymentUrl;
    private String sessionId;
}