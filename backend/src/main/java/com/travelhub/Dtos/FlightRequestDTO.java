package com.travelhub.Dtos;

import com.travelhub.entity.enums.DestinationType;
import com.travelhub.entity.enums.FlightClassType;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.math.BigDecimal;

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

    private Integer totalSeats;

    private List<String> imageUrls;

    private Map<FlightClassType, BigDecimal> classPrices;
}