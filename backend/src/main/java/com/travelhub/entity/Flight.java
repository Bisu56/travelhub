package com.travelhub.entity;

import com.travelhub.entity.enums.DestinationType;
import com.travelhub.entity.enums.PackageStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "flights",
        indexes = {
                @Index(name = "idx_route_type", columnList = "departureCity,arrivalCity,type")
        })
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String airlineName;
    private String flightNumber;

    private String departureCountry;
    private String departureCity;

    private String arrivalCountry;
    private String arrivalCity;

    @Enumerated(EnumType.STRING)
    private DestinationType type;

    private LocalDate departureDate;
    private LocalDate arrivalDate;

    private BigDecimal basePrice;
    private BigDecimal discountPercentage;
    private BigDecimal finalPrice;

    private Integer totalSeats;

    @Enumerated(EnumType.STRING)
    private PackageStatus status;

    private Boolean isDeleted = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "agent_id")
    private User createdBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approved_by")
    private User approvedBy;

    private Instant approvedAt;
    private String rejectionReason;

    private Instant createdAt;
    private Instant updatedAt;

    @ElementCollection
    @CollectionTable(name = "flight_images",
            joinColumns = @JoinColumn(name = "flight_id"))
    @Column(name = "image_url", length = 1000)
    private List<String> imageUrls;

    private Double ratingAverage = 0.0;
    private Long totalReviews = 0L;

    @PrePersist
    protected void onCreate() {
        createdAt = Instant.now();
        updatedAt = Instant.now();
        if (status == null) status = PackageStatus.DRAFT;
        calculateFinalPrice();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = Instant.now();
        calculateFinalPrice();
    }

    public void calculateFinalPrice() {
        if (basePrice == null) {
            throw new IllegalArgumentException("Base price required");
        }

        BigDecimal total = basePrice;

        if (discountPercentage != null &&
                discountPercentage.compareTo(BigDecimal.ZERO) > 0) {

            BigDecimal discount =
                    total.multiply(discountPercentage)
                            .divide(BigDecimal.valueOf(100));

            total = total.subtract(discount);
        }

        this.finalPrice = total;
    }

    public void updateRating(Double avg, Long total) {
        this.ratingAverage = avg;
        this.totalReviews = total;
    }
}