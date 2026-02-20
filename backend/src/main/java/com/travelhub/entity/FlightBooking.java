package com.travelhub.entity;
import com.travelhub.entity.enums.BookingStatus;
import com.travelhub.entity.enums.FlightClassType;
import com.travelhub.entity.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "flight_bookings",
        indexes = {
                @Index(name = "idx_booking_reference", columnList = "booking_reference")
        })
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FlightBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "booking_reference", unique = true, nullable = false, updatable = false)
    private String bookingReference;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "flight_id")
    private Flight flight;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FlightClassType flightClassType;

    @Column(nullable = false)
    private Integer passengersCount;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal totalAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus bookingStatus;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus paymentStatus;

    private Instant bookedAt;

    @PrePersist
    protected void onCreate() {
        this.bookingReference = UUID.randomUUID().toString();
        this.bookedAt = Instant.now();
    }
}