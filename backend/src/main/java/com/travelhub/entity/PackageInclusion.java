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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "package_id", nullable = false, unique = true)
    private DestinationPackage destinationPackage;

    private Boolean includesHotel;
    private Boolean includesFlight;
    private Boolean includesFood;
    private Boolean includesTransport;

    private String hotelType;
    private String flightClass;
}
