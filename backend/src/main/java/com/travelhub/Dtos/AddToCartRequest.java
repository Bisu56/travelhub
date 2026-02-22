package com.travelhub.Dtos;

import com.travelhub.entity.enums.ServiceType;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

public class AddToCartRequest {

    @NotNull
    private Long referenceId;

    @NotNull
    private ServiceType serviceType;

    @Min(1)
    private Integer quantity;

    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate travelDate;

    // getters & setters
}