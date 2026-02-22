package com.travelhub.Dtos;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleBookingRequest {

    @NotNull
    private Boolean fullVehicle;

    @Min(1)
    private Integer seats;

    @Min(1)
    private Integer days;
}