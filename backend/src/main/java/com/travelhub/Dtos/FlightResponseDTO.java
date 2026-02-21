package com.travelhub.Dtos;
import com.travelhub.entity.enums.DestinationType;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class FlightResponseDTO {

    private Long id;
    private String flightNumber;
    private String airlineName;
    private DestinationType destinationType;

    private String origin;
    private String destination;

    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;

    private BigDecimal economyPrice;
    private BigDecimal premiumEconomyPrice;
    private BigDecimal businessPrice;
    private BigDecimal firstClassPrice;
}