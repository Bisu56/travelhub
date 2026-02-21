package com.travelhub.entity;

import com.travelhub.entity.enums.BookingStatus;
import com.travelhub.entity.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "vehicle_bookings")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VehicleBooking extends BaseAuditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private VehicleOffering vehicle;

    @ManyToOne
    private User user;

    private Integer seatCount;

    private Boolean fullVehicle; // true if full vehicle booked

    private Integer days; // duration if full vehicle

    private BigDecimal totalPrice;

    @Enumerated(EnumType.STRING)
    private BookingStatus bookingStatus;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    private String rejectionReason;
}