package com.travelhub.service;

import com.travelhub.entity.DestinationPackage;
import com.travelhub.entity.enums.DestinationType;
import com.travelhub.entity.enums.PackageStatus;
import com.travelhub.repository.DestinationPackageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DestinationSearchService {

    private final DestinationPackageRepository repository;

    /**
     * Search destination packages with optional filters:
     * country, city, type, price range, travel date, and package inclusions
     *
     * @param country   optional country filter
     * @param city      optional city filter
     * @param type      optional destination type
     * @param minPrice  optional minimum price filter (applied on finalPrice)
     * @param maxPrice  optional maximum price filter (applied on finalPrice)
     * @param travelDate optional travel date filter
     * @param includesHotel optional filter if package includes hotel
     * @param includesFlight optional filter if package includes flight
     * @param includesFood optional filter if package includes food
     * @param includesTransport optional filter if package includes transport
     * @return list of matching DestinationPackage
     */
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

        return repository.findAll()
                .stream()
                .filter(p -> p.getStatus() == PackageStatus.PUBLISHED)
                .filter(p -> country == null || p.getCountry().equalsIgnoreCase(country))
                .filter(p -> city == null || p.getCity().equalsIgnoreCase(city))
                .filter(p -> type == null || p.getType() == type)
                .filter(p -> minPrice == null || p.getFinalPrice().doubleValue() >= minPrice)
                .filter(p -> maxPrice == null || p.getFinalPrice().doubleValue() <= maxPrice)
                .filter(p -> travelDate == null ||
                        (p.getAvailableFrom() != null && p.getAvailableTo() != null &&
                                !travelDate.isBefore(p.getAvailableFrom()) &&
                                !travelDate.isAfter(p.getAvailableTo())))
                .filter(p -> includesHotel == null || p.getInclusionDetails().getIncludesHotel() == includesHotel)
                .filter(p -> includesFlight == null || p.getInclusionDetails().getIncludesFlight() == includesFlight)
                .filter(p -> includesFood == null || p.getInclusionDetails().getIncludesFood() == includesFood)
                .filter(p -> includesTransport == null || p.getInclusionDetails().getIncludesTransport() == includesTransport)
                .toList();
    }
}
