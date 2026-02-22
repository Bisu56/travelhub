package com.travelhub.Dtos;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class CartResponseDTO {

    private Long cartId;
    private String status;

    private BigDecimal totalAmount;

    private LocalDateTime expiresAt;
    private LocalDateTime createdAt;

    private List<CartItemResponseDTO> items;
}