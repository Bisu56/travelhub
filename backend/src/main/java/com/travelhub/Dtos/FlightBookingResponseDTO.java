package com.travelhub.Dtos;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class FlightBookingResponseDTO {

    private Long id;
    private Long flightId;
    private String airlineName;
    private String flightNumber;

    private Integer passengers;
    private String flightClass;

    private BigDecimal totalPrice;

    private String bookingStatus;
    private String paymentStatus;
    private String rejectionReason;

}
