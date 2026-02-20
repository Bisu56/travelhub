package com.travelhub.service;

import com.travelhub.entity.DestinationPackage;
import com.travelhub.entity.PackageInclusionDetails;
import com.travelhub.entity.enums.DestinationType;
import com.travelhub.entity.enums.PackageStatus;
import com.travelhub.repository.DestinationPackageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class DestinationSearchService {

    private final DestinationPackageRepository repository;

    public List<DestinationPackage> search(String country,
                                           String city,
                                           DestinationType type,
                                           Double minPrice,
                                           Double maxPrice,
                                           LocalDate travelDate,
                                           Boolean includesHotel,
                                           Boolean includesFlight,
                                           Boolean includesFood,
                                           Boolean includesTransport) {

        // DB-level filtering: Only PUBLISHED  not deleted
        List<DestinationPackage> published =
                repository.findByStatusAndIsDeletedFalse(PackageStatus.PUBLISHED);

        return published.stream()

                .filter(p -> isMatch(country, p.getCountry()))
                .filter(p -> isMatch(city, p.getCity()))
                .filter(p -> type == null || p.getType() == type)

                .filter(p -> minPrice == null ||
                        p.getFinalPrice().doubleValue() >= minPrice)

                .filter(p -> maxPrice == null ||
                        p.getFinalPrice().doubleValue() <= maxPrice)

                .filter(p -> travelDate == null || isWithinTravelDate(p, travelDate))

                .filter(p -> inclusionMatch(p.getInclusionDetails(),
                        includesHotel,
                        includesFlight,
                        includesFood,
                        includesTransport))

                .toList();
    }

    private boolean isMatch(String filter, String value) {
        return filter == null ||
                (value != null && value.equalsIgnoreCase(filter));
    }

    private boolean isWithinTravelDate(DestinationPackage p, LocalDate travelDate) {
        return p.getAvailableFrom() != null &&
                p.getAvailableTo() != null &&
                !travelDate.isBefore(p.getAvailableFrom()) &&
                !travelDate.isAfter(p.getAvailableTo());
    }

    private boolean inclusionMatch(PackageInclusionDetails details,
                                   Boolean hotel,
                                   Boolean flight,
                                   Boolean food,
                                   Boolean transport) {

        if (details == null) return false;

        return (hotel == null || Objects.equals(details.getIncludesHotel(), hotel))
                && (flight == null || Objects.equals(details.getIncludesFlight(), flight))
                && (food == null || Objects.equals(details.getIncludesFood(), food))
                && (transport == null || Objects.equals(details.getIncludesTransport(), transport));
    }
}