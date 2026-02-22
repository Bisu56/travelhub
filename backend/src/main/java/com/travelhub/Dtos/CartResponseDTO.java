package com.travelhub.Dtos;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class CartResponseDTO {

    private Long cartId;
    private BigDecimal totalAmount;
    private String status;
    private List<CartItemResponseDTO> items;
}