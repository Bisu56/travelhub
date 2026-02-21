package com.travelhub.Dtos;

import com.travelhub.entity.enums.BookingStatus;
import com.travelhub.entity.enums.PaymentStatus;
import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleBookingResponseDTO {
    private Long id;
    private Long vehicleId;
    private String vehicleType;
    private Long userId;
    private String userEmail;
    private Integer seatCount;
    private Boolean fullVehicle;
    private Integer days;
    private BigDecimal totalPrice;
    private BookingStatus bookingStatus;
    private PaymentStatus paymentStatus;
    private String rejectionReason;
}