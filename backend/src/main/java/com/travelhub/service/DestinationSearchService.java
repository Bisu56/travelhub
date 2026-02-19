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

    public List<DestinationPackage> search(String country,
                                           String city,
                                           DestinationType type,
                                           Double minPrice,
                                           Double maxPrice,
                                           LocalDate travelDate) {

        return repository.findAll()
                .stream()
                .filter(p -> p.getStatus() == PackageStatus.PUBLISHED)
                .filter(p -> country == null || p.getCountry().equalsIgnoreCase(country))
                .filter(p -> city == null || p.getCity().equalsIgnoreCase(city))
                .filter(p -> type == null || p.getType() == type)
                .filter(p -> minPrice == null || p.getDiscountPrice().doubleValue() >= minPrice)
                .filter(p -> maxPrice == null || p.getDiscountPrice().doubleValue() <= maxPrice)
                .filter(p -> travelDate == null ||
                        (p.getAvailableFrom().compareTo(travelDate) <= 0 &&
                                p.getAvailableTo().compareTo(travelDate) >= 0))
                .toList();
    }
}
