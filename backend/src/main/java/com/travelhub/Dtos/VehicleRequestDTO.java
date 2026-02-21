package com.travelhub.Dtos;

import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleRequestDTO {

    @NotBlank
    private String vehicleType;

    @NotBlank
    private String location;

    private String description;

    @NotNull
    @Min(1)
    private Integer totalSeats;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal pricePerSeat;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal fullVehiclePricePerDay;
}