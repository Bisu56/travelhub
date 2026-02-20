package com.travelhub.Dtos;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class DestinationBookingResponseDTO {

    private Long id;
    private Long packageId;
    private String packageTitle;
    private Integer numberOfPeople;
    private LocalDate travelDate;
    private BigDecimal totalPrice;

    private String bookingStatus;   // PENDING, CONFIRMED, COMPLETED, CANCELLED
    private String paymentStatus;   // UNPAID, PAID, REFUNDED
}