package com.travelhub.Dtos;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class CartItemResponseDTO {

    private Long itemId;
    private Long referenceId;
    private String serviceType;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal subtotal;
}