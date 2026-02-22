package com.travelhub.Dtos;

import com.travelhub.entity.enums.ServiceType;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class AddToCartRequest {

    @NotNull(message = "Reference ID is required")
    private Long referenceId;

    @NotNull(message = "Service type is required")
    private ServiceType serviceType;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;

    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate travelDate;
}