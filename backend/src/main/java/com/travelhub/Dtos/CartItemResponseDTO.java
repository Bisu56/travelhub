package com.travelhub.Dtos;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class CartItemResponseDTO {

    private Long itemId;
    private Long referenceId;
    private String serviceType;

    private Integer quantity;

    private BigDecimal unitPrice;
    private BigDecimal subtotal;

    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate travelDate;
}