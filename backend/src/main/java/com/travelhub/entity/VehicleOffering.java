package com.travelhub.entity;

import com.travelhub.entity.enums.PackageStatus;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "vehicles")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VehicleOffering {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String vehicleType; // Car, Bus, Van, etc.

    @Column(nullable = false)
    private String location;

    @Column(length = 2000)
    private String description;

    @Column(nullable = false)
    private Integer totalSeats;

    @Column(nullable = false)
    private BigDecimal pricePerSeat;

    @Column(nullable = false)
    private BigDecimal fullVehiclePricePerDay;

    @Column(nullable = false)
    private Boolean active = true;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PackageStatus approvalStatus;

    @ManyToOne
    private User createdBy;

    @ManyToOne
    private User approvedBy;

    private Instant approvedAt;

    private String rejectionReason;
}