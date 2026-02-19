package com.travelhub.service;
import com.travelhub.entity.DestinationPackage;
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

    public List<DestinationPackage> search(
            String country,
            LocalDate from,
            LocalDate to
    ) {
        return repository.findByCountryAndStatusAndAvailableFromLessThanEqualAndAvailableToGreaterThanEqual(
                country,
                PackageStatus.PUBLISHED,
                from,
                to
        );
    }
}
