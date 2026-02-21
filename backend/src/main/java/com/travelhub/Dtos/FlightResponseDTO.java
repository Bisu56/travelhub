package com.travelhub.Dtos;

import com.travelhub.entity.enums.DestinationType;
import com.travelhub.entity.enums.PackageStatus;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

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

    private BigDecimal basePrice;
    private BigDecimal discountPercentage;
    private BigDecimal finalPrice;

    private Integer totalSeats;

    private Double ratingAverage;
    private Long totalReviews;

    private PackageStatus status;

    private Long agentId;
    private String agentEmail;

    private List<String> imageUrls;
}