package com.travelhub.Dtos;

import com.travelhub.entity.enums.FlightClassType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class FlightBookingRequest {

    @NotNull
    @Min(1)
    private Integer passengers;

    @NotNull
    private FlightClassType flightClass;
}