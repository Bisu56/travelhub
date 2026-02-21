package com.travelhub.Dtos;

import lombok.Data;

import java.time.LocalDate;

@Data
public class FlightSearchRequestDTO {

    private String origin;
    private String destination;
    private LocalDate departureDate;
}