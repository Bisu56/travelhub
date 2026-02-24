package com.travelhub.Dtos;
import lombok.Data;

@Data
public class RefundRequestDTO {
    private Long paymentId;
    private String reason;
}