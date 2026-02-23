package com.travelhub.payment;

import com.travelhub.Dtos.PaymentConfirmationDTO;
import com.travelhub.entity.Payment;

public interface PaymentGateway {

    String getGatewayName();

    PaymentGatewayResponse createPayment(Payment payment) throws Exception;

    default void verifyPayment(PaymentConfirmationDTO confirmation) throws Exception {
        // optional override for gateways like Khalti if verification is needed
    }
}