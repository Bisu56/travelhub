package com.travelhub.entity;

import com.travelhub.entity.enums.DestinationType;
import com.travelhub.entity.enums.PackageStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name = "destination_packages")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DestinationPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 3000)
    private String description;

    private String country;
    private String city;

    @Enumerated(EnumType.STRING)
    private DestinationType type;

    private Integer durationDays;

    private LocalDate availableFrom;
    private LocalDate availableTo;

    private BigDecimal basePrice;
    private BigDecimal discountPrice;

    private Integer maxPeople;

    private Double ratingAverage = 0.0;
    private Long totalReviews = 0L;

    @Enumerated(EnumType.STRING)
    private PackageStatus status;

    private Boolean isDeleted = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "agent_id")
    private User createdBy;

    private Instant createdAt;
    private Instant updatedAt;

    @PrePersist
    void onCreate() {
        createdAt = Instant.now();
        updatedAt = Instant.now();
        if (status == null) status = PackageStatus.DRAFT;
    }

    @PreUpdate
    void onUpdate() {
        updatedAt = Instant.now();
    }
}
