package com.travelhub.payment;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaymentGatewayResponse {

    private String paymentUrl;
    private String sessionId;
}