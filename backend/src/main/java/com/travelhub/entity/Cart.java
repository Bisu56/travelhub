package com.travelhub.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
    @Table(name = "carts")
    @Getter
    @Setter
    public class Cart {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @OneToOne
        private User user;

        @Enumerated(EnumType.STRING)
        private CartStatus status;
        // ACTIVE, CHECKED_OUT, EXPIRED

        private BigDecimal totalAmount;

        private LocalDateTime expiresAt;

        @CreationTimestamp
        private LocalDateTime createdAt;
    }
}
