package com.travelhub.controller;

import com.travelhub.Dtos.RefundRequestDTO;
import com.travelhub.entity.Refund;
import com.travelhub.entity.User;
import com.travelhub.payment.RefundService;
import com.travelhub.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/refunds")
@RequiredArgsConstructor
public class RefundController {

    private final RefundService refundService;
    private final UserService userService;

    @PostMapping("/request")
    public Refund requestRefund(Authentication auth, @RequestBody RefundRequestDTO dto) {
        User user = userService.getCurrentUser(auth);
        return refundService.requestRefund(user, dto.getPaymentId(), dto.getReason());
    }

    @PostMapping("/execute/{refundId}")
    public void executeRefund(Authentication auth, @PathVariable Long refundId) throws Exception {
        User admin = userService.getCurrentUser(auth);
        refundService.executeRefund(admin, refundId);
    }
}