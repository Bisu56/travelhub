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
public class VehicleBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private VehicleOffering vehicle;

    @Column(nullable = false)
    private Integer seatCount;

    @Column(nullable = false)
    private Integer days;

    @Column(nullable = false)
    private Boolean fullVehicle;

    @Column(nullable = false)
    private BigDecimal totalPrice;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus bookingStatus;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus paymentStatus;

    private String rejectionReason;
}