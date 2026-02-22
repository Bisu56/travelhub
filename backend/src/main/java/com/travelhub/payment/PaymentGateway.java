package com.travelhub.payment;

import com.travelhub.entity.User;
import com.travelhub.entity.Cart;

public interface PaymentGateway {


    String createPaymentSession(User user, Cart cart);


    boolean verifyPayment(String sessionId);

}