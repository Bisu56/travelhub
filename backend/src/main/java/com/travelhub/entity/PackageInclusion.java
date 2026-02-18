package com.travelhub.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "package_inclusions")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PackageInclusion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "package_id")
    private DestinationPackage destinationPackage;

    private Boolean includesHotel;
    private Boolean includesFlight;
    private Boolean includesFood;
    private Boolean includesTransport;

    private String hotelType;
    private String flightClass;
}
