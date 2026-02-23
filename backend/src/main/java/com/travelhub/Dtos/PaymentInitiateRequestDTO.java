package com.travelhub.Dtos;

import lombok.Data;

@Data
public class PaymentInitiateRequestDTO {
    private String gateway; // STRIPE or KHALTI
}