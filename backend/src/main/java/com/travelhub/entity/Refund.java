package com.travelhub.entity;

import com.travelhub.entity.enums.RefundStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Refund {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Payment payment;

    private String gatewayRefundId;

    private String reason;

    private String gateway;

    @Enumerated(EnumType.STRING)
    private RefundStatus status;

    private LocalDateTime createdAt;
}
