package com.travelhub.Dtos;

import com.travelhub.entity.enums.DestinationType;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
public class FlightRequestDTO {

    private String airlineName;
    private String flightNumber;

    private String departureCountry;
    private String departureCity;

    private String arrivalCountry;
    private String arrivalCity;

    private DestinationType type;

    private LocalDate departureDate;
    private LocalDate arrivalDate;

    private BigDecimal basePrice;
    private BigDecimal discountPercentage;

    private Integer totalSeats;

    private List<String> imageUrls;
}