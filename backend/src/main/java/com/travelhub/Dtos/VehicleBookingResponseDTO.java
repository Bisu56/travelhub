package com.travelhub.Dtos;

import com.travelhub.entity.enums.BookingStatus;
import com.travelhub.entity.enums.PaymentStatus;
import lombok.*;
import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VehicleBookingResponseDTO {

    private Long id;
    private Long vehicleId;
    private String vehicleType;
    private Integer seatCount;
    private Integer days;
    private Boolean fullVehicle;
    private BigDecimal totalPrice;
    private BookingStatus bookingStatus;
    private PaymentStatus paymentStatus;
}