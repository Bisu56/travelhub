package com.travelhub.Dtos;

import com.travelhub.entity.enums.FlightClassType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class FlightBookingRequestDTO {

    @NotNull
    private Long flightId;

    @NotNull
    private FlightClassType flightClassType;

    @Min(1)
    private Integer passengersCount;
}