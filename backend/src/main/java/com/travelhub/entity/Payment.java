package com.travelhub.entity;

import com.travelhub.entity.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Each payment belongs to one cart
    @OneToOne
    @JoinColumn(name = "cart_id", nullable = false, unique = true)
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(nullable = false)
    private String currency; // NPR / USD etc

    @Column(nullable = false)
    private String gateway; // STRIPE / KHALTI

    @Column(unique = true)
    private String paymentSessionId; // gateway session

    @Column(unique = true)
    private String gatewayTransactionId; // returned after success

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    private String failureReason;

    private LocalDateTime createdAt;
    private LocalDateTime confirmedAt;
}