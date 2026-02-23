package com.travelhub.Dtos;

import lombok.Data;

@Data
public class PaymentConfirmationDTO {
    private String sessionId;
    private String gatewayTransactionId;
    private boolean success;
}