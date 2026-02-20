package com.travelhub.Mapper;

import com.travelhub.Dtos.*;
import com.travelhub.entity.*;

public class DestinationMapper {

    public static DestinationPackage toEntity(DestinationRequestDTO dto, User agent) {
        PackageInclusionDetails inclusion = PackageInclusionDetails.builder()
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
        PackageInclusionDetails inc = entity.getInclusionDetails();
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
                .status(entity.getStatus()) // pass enum directly
                .imageUrls(entity.getImageUrls())
                .agentId(entity.getCreatedBy() != null ? entity.getCreatedBy().getId() : null)
                .agentEmail(entity.getCreatedBy() != null ? entity.getCreatedBy().getEmail() : null)
                .includesHotel(inc != null && inc.getIncludesHotel() != null ? inc.getIncludesHotel() : false)
                .includesFlight(inc != null && inc.getIncludesFlight() != null ? inc.getIncludesFlight() : false)
                .includesFood(inc != null && inc.getIncludesFood() != null ? inc.getIncludesFood() : false)
                .includesTransport(inc != null && inc.getIncludesTransport() != null ? inc.getIncludesTransport() : false)
                .hotelCost(inc != null ? inc.getHotelCost() : null)
                .flightCost(inc != null ? inc.getFlightCost() : null)
                .foodCost(inc != null ? inc.getFoodCost() : null)
                .transportCost(inc != null ? inc.getTransportCost() : null)
                .hotelType(inc != null ? inc.getHotelType() : null)
                .flightClass(inc != null ? inc.getFlightClass() : null)
                .build();
    }
}