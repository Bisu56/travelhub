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
public class DestinationResponseDTO {

    private Long id;
    private String title;
    private String description;

    private String country;
    private String city;

    private DestinationType type;
    private Integer durationDays;

    private LocalDate availableFrom;
    private LocalDate availableTo;

    private List<String> imageUrls;

    private BigDecimal basePrice;
    private BigDecimal discountPrice;

    private Integer maxPeople;

    private Double ratingAverage;
    private Long totalReviews;

    private PackageStatus status;

    private Long agentId;
    private String agentEmail;

    private Boolean includesHotel;
    private Boolean includesFlight;
    private Boolean includesFood;
    private Boolean includesTransport;

    private String hotelType;
    private String flightClass;
}
