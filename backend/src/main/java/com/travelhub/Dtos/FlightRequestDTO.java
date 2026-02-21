package com.travelhub.Dtos;

import com.travelhub.entity.enums.FlightClassType;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FlightRequestDTO {

    private String flightNumber;

    private String origin;
    private String destination;

    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;

    private FlightClassType flightClass;

    private Integer availableSeats;

    private BigDecimal basePrice;
}