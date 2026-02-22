package com.travelhub.entity;

import com.travelhub.entity.enums.DestinationType;
import com.travelhub.entity.enums.PackageStatus;
import com.travelhub.entity.enums.FlightClassType;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "flights")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String airlineName;
    private String flightNumber;

    private String departureCountry;
    private String departureCity;

    private String arrivalCountry;
    private String arrivalCity;

    @Enumerated(EnumType.STRING)
    private DestinationType type;

    private LocalDate departureDate;
    private LocalDate arrivalDate;

    private Integer totalSeats;

    @Enumerated(EnumType.STRING)
    private PackageStatus status;

    @ManyToOne
    private User createdBy;

    @ManyToOne
    private User approvedBy;

    private Instant approvedAt;

    private Boolean isDeleted = false;

    @ElementCollection
    @CollectionTable(name = "flight_class_prices", joinColumns = @JoinColumn(name = "flight_id"))
    @MapKeyEnumerated(EnumType.STRING)
    @MapKeyColumn(name = "class_type")
    @Column(name = "price")
    private Map<FlightClassType, BigDecimal> classPrices;

    private List<String> imageUrls;

    private Double ratingAverage;
    private Long totalReviews;

    private String rejectionReason;

    public BigDecimal getPriceByClass(FlightClassType flightClass) {
        if (classPrices == null || !classPrices.containsKey(flightClass)) {
            throw new RuntimeException("Price not set for class: " + flightClass);
        }
        return classPrices.get(flightClass);
    }
}
