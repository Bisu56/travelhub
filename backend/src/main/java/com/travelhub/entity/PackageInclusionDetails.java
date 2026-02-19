package com.travelhub.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Embeddable
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PackageInclusionDetails {

    private Boolean includesHotel = false;
    private Boolean includesFlight = false;
    private Boolean includesFood = false;
    private Boolean includesTransport = false;

    private BigDecimal hotelCost;
    private BigDecimal flightCost;
    private BigDecimal foodCost;
    private BigDecimal transportCost;

    private String hotelType;
    private String flightClass;
}
