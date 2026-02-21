package com.travelhub.Dtos;
import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleRequestDTO {
    private String vehicleType;
    private String description;
    private String location;
    private BigDecimal pricePerSeat;
    private BigDecimal fullVehiclePricePerDay;
    private Integer totalSeats;
}