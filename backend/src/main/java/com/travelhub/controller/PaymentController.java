package com.travelhub.controller;

import com.travelhub.Dtos.PaymentInitiateResponseDTO;
import com.travelhub.entity.User;
import com.travelhub.payment.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/{cartId}")
    public PaymentInitiateResponseDTO initiate(
            @AuthenticationPrincipal User user,
            @PathVariable Long cartId,
            @RequestParam String gateway
    ) throws Exception {

        return paymentService.initiatePayment(user, cartId, gateway);
    }
}