package com.travelhub.Mapper;

import com.travelhub.Dtos.*;
import com.travelhub.entity.*;

public class DestinationMapper {

    public static DestinationPackage toEntity(
            DestinationRequestDTO dto,
            User agent
    ) {

        PackageInclusionDetails inclusion =
                PackageInclusionDetails.builder()
                        .includesHotel(dto.getIncludesHotel())
                        .includesFlight(dto.getIncludesFlight())
                        .includesFood(dto.getIncludesFood())
                        .includesTransport(dto.getIncludesTransport())
                        .hotelCost(dto.getHotelCost())
                        .flightCost(dto.getFlightCost())
                        .foodCost(dto.getFoodCost())
                        .transportCost(dto.getTransportCost())
                        .hotelType(dto.getHotelType())
                        .flightClass(dto.getFlightClass())
                        .build();

        return DestinationPackage.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .country(dto.getCountry())
                .city(dto.getCity())
                .type(dto.getType())
                .durationDays(dto.getDurationDays())
                .availableFrom(dto.getAvailableFrom())
                .availableTo(dto.getAvailableTo())
                .basePrice(dto.getBasePrice())
                .discountPercentage(dto.getDiscountPercentage())
                .maxPeople(dto.getMaxPeople())
                .imageUrls(dto.getImageUrls())
                .inclusionDetails(inclusion)
                .createdBy(agent)
                .build();
    }

    public static DestinationResponseDTO toDTO(DestinationPackage entity) {

        PackageInclusionDetails inclusion = entity.getInclusionDetails();

        return DestinationResponseDTO.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .country(entity.getCountry())
                .city(entity.getCity())
                .type(entity.getType())
                .durationDays(entity.getDurationDays())
                .availableFrom(entity.getAvailableFrom())
                .availableTo(entity.getAvailableTo())
                .basePrice(entity.getBasePrice())
                .discountPercentage(entity.getDiscountPercentage())
                .finalPrice(entity.getFinalPrice())
                .maxPeople(entity.getMaxPeople())
                .ratingAverage(entity.getRatingAverage())
                .totalReviews(entity.getTotalReviews())
                .status(entity.getStatus())
                .imageUrls(entity.getImageUrls())
                .agentId(entity.getCreatedBy() != null ? entity.getCreatedBy().getId() : null)
                .agentEmail(entity.getCreatedBy() != null ? entity.getCreatedBy().getEmail() : null)

                .includesHotel(inclusion != null ? inclusion.getIncludesHotel() : false)
                .includesFlight(inclusion != null ? inclusion.getIncludesFlight() : false)
                .includesFood(inclusion != null ? inclusion.getIncludesFood() : false)
                .includesTransport(inclusion != null ? inclusion.getIncludesTransport() : false)
                .hotelCost(inclusion != null ? inclusion.getHotelCost() : null)
                .flightCost(inclusion != null ? inclusion.getFlightCost() : null)
                .foodCost(inclusion != null ? inclusion.getFoodCost() : null)
                .transportCost(inclusion != null ? inclusion.getTransportCost() : null)
                .hotelType(inclusion != null ? inclusion.getHotelType() : null)
                .flightClass(inclusion != null ? inclusion.getFlightClass() : null)

                .build();
    }
}
