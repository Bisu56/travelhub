package com.travelhub.entity;

import jakarta.persistence.*;
import lombok.*;

@Embeddable
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PackageInclusionDetails {

    @Column(name = "includes_hotel")
    private Boolean includesHotel = false;

    @Column(name = "includes_flight")
    private Boolean includesFlight = false;

    @Column(name = "includes_food")
    private Boolean includesFood = false;

    @Column(name = "includes_transport")
    private Boolean includesTransport = false;

    @Column(name = "hotel_type")
    private String hotelType;

    @Column(name = "flight_class")
    private String flightClass;
}
