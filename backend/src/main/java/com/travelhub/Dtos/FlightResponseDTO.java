package com.travelhub.Dtos;

import com.travelhub.entity.enums.DestinationType;
import com.travelhub.entity.enums.PackageStatus;
import com.travelhub.entity.enums.FlightClassType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
@Builder
public class FlightResponseDTO {

    private Long id;

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

    private PackageStatus status;

    private Long agentId;
    private String agentEmail;

    private List<String> imageUrls;

    private Double ratingAverage;
    private Long totalReviews;

    private Map<FlightClassType, BigDecimal> classPrices;
}