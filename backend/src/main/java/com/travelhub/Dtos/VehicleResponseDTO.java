package com.travelhub.Dtos;

import com.travelhub.entity.enums.PackageStatus;
import lombok.*;
import java.math.BigDecimal;
import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VehicleResponseDTO {

    private Long id;
    private String vehicleType;
    private String location;
    private String description;
    private Integer totalSeats;
    private BigDecimal pricePerSeat;
    private BigDecimal fullVehiclePricePerDay;
    private PackageStatus approvalStatus;
    private String createdByEmail;
    private String approvedByEmail;
    private Instant approvedAt;
    private String rejectionReason;
}