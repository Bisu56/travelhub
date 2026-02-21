package com.travelhub.Dtos;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleBookingRequest {
    private Boolean fullVehicle = false; // true for full vehicle
    private Integer seats; // ignored if fullVehicle=true
    private Integer days; // only used for full vehicle
}