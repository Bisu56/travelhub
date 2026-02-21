package com.travelhub.Dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingRequest {
    @NotNull
    @Min(1)
    private Integer people;

    @NotNull
    private LocalDate travelDate;
}