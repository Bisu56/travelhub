package com.travelhub.entity;

import com.travelhub.entity.enums.PackageStatus;
import com.travelhub.entity.enums.Role;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "vehicle_offerings")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VehicleOffering extends BaseAuditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private User createdBy;

    @Column(nullable = false)
    private String vehicleType; // SUV, Sedan, Bus, etc.

    @Column(nullable = false, length = 500)
    private String description;

    @Column(nullable = false)
    private String location;

    private BigDecimal pricePerSeat;

    private BigDecimal fullVehiclePricePerDay;

    @Column(nullable = false)
    private Integer totalSeats;

    @Column(nullable = false)
    private Integer availableSeats;

    @Enumerated(EnumType.STRING)
    private PackageStatus approvalStatus;

    private String rejectionReason;

    private Boolean active = true;

    @ManyToOne(fetch = FetchType.LAZY)
    private User approvedBy;

    private Instant approvedAt;
}