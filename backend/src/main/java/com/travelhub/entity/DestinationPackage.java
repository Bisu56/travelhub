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
@Table(name = "destination_packages",
        indexes = {
                @Index(name = "idx_country_type", columnList = "country,type")
        })
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
    private BigDecimal discountPercentage;
    private BigDecimal finalPrice;

    private Integer maxPeople;

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
    @CollectionTable(name = "destination_images",
            joinColumns = @JoinColumn(name = "destination_id"))
    @Column(name = "image_url", length = 1000)
    private List<String> imageUrls;

    private Double ratingAverage = 0.0;
    private Long totalReviews = 0L;

    @Embedded
    private PackageInclusionDetails inclusionDetails;

    public void updateRating(Double avg, Long total) {
        this.ratingAverage = avg;
        this.totalReviews = total;
    }

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
            throw new IllegalArgumentException("Base price is required");
        }

        BigDecimal total = basePrice;

        if (inclusionDetails != null) {

            if (Boolean.TRUE.equals(inclusionDetails.getIncludesHotel())) {
                validateRequired(inclusionDetails.getHotelType(), "Hotel type required");
                total = total.add(nullSafe(inclusionDetails.getHotelCost()));
            }

            if (Boolean.TRUE.equals(inclusionDetails.getIncludesFlight())) {
                validateRequired(inclusionDetails.getFlightClass(), "Flight class required");
                total = total.add(nullSafe(inclusionDetails.getFlightCost()));
            }

            if (Boolean.TRUE.equals(inclusionDetails.getIncludesFood())) {
                total = total.add(nullSafe(inclusionDetails.getFoodCost()));
            }

            if (Boolean.TRUE.equals(inclusionDetails.getIncludesTransport())) {
                total = total.add(nullSafe(inclusionDetails.getTransportCost()));
            }
        }

        if (discountPercentage != null
                && discountPercentage.compareTo(BigDecimal.ZERO) > 0) {

            BigDecimal discountAmount =
                    total.multiply(discountPercentage)
                            .divide(BigDecimal.valueOf(100));

            total = total.subtract(discountAmount);
        }

        this.finalPrice = total;
    }

    private BigDecimal nullSafe(BigDecimal value) {
        return value != null ? value : BigDecimal.ZERO;
    }

    private void validateRequired(String value, String message) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(message);
        }
    }
}
