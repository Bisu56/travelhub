package com.travelhub.controller;

import com.travelhub.Dtos.PaymentInitiateResponseDTO;
import com.travelhub.entity.User;
import com.travelhub.payment.PaymentService;
import com.travelhub.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;
    private final UserService userService;

    @PostMapping("/{cartId}")
    public PaymentInitiateResponseDTO initiate(
            Authentication auth,
            @PathVariable Long cartId,
            @RequestParam String gateway
    ) throws Exception {

        User user = userService.getCurrentUser(auth);

        return paymentService.initiatePayment(user, cartId, gateway);
    }
}