package com.travelhub.Dtos;

import com.travelhub.entity.enums.PackageStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleResponseDTO {
    private Long id;
    private String vehicleType;
    private String description;
    private String location;
    private BigDecimal pricePerSeat;
    private BigDecimal fullVehiclePricePerDay;
    private Integer totalSeats;
    private Integer availableSeats;
    private PackageStatus approvalStatus;
    private String rejectionReason;
    private Boolean active;
    private String createdByEmail;
    private String approvedByEmail;
    private Instant approvedAt;
}