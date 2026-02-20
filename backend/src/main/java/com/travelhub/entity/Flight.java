package com.travelhub.entity;

import com.travelhub.entity.enums.DestinationType;
import com.travelhub.entity.enums.PackageStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "flights",
        indexes = {
                @Index(name = "idx_origin_destination", columnList = "origin,destination"),
                @Index(name = "idx_departure_time", columnList = "departure_time")
        })
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String flightNumber;

    @Column(nullable = false)
    private String airlineName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DestinationType destinationType; // DOMESTIC / FOREIGN

    @Column(nullable = false)
    private String origin;

    @Column(nullable = false)
    private String destination;

    @Column(name = "departure_time", nullable = false)
    private LocalDateTime departureTime;

    @Column(name = "arrival_time", nullable = false)
    private LocalDateTime arrivalTime;

    @Column(nullable = false)
    private Integer durationMinutes;

    // Cabin Class Pricing
    @Column(precision = 12, scale = 2)
    private BigDecimal economyPrice;

    @Column(precision = 12, scale = 2)
    private BigDecimal premiumEconomyPrice;

    @Column(precision = 12, scale = 2)
    private BigDecimal businessPrice;

    @Column(precision = 12, scale = 2)
    private BigDecimal firstClassPrice;

    // Seat Counters Per Class
    private Integer economyTotalSeats;
    private Integer economyAvailableSeats;

    private Integer premiumEconomyTotalSeats;
    private Integer premiumEconomyAvailableSeats;

    private Integer businessTotalSeats;
    private Integer businessAvailableSeats;

    private Integer firstClassTotalSeats;
    private Integer firstClassAvailableSeats;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PackageStatus status; // Reusing your lifecycle: DRAFT → APPROVED → PUBLISHED

    @Column(nullable = false)
    private Boolean isDeleted = false;
}