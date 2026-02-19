package com.travelhub.Dtos;

import com.travelhub.entity.enums.DestinationType;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
public class DestinationRequestDTO {

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
}
