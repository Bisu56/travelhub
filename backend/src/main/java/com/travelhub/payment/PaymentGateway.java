package com.travelhub.payment;

import com.travelhub.entity.Payment;

public interface PaymentGateway {

    String getGatewayName();

    PaymentGatewayResponse createPayment(Payment payment) throws Exception;
}