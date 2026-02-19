package com.travelhub.repository;
import com.travelhub.entity.DestinationPackage;
import com.travelhub.entity.User;
import com.travelhub.entity.enums.PackageStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.time.LocalDate;
import java.util.List;
public interface DestinationPackageRepository
        extends JpaRepository<DestinationPackage, Long>,
        JpaSpecificationExecutor<DestinationPackage> {

    List<DestinationPackage> findByCreatedByAndIsDeletedFalse(User agent);

    List<DestinationPackage>
    findByCountryAndStatusAndAvailableFromLessThanEqualAndAvailableToGreaterThanEqual(
            String country,
            PackageStatus status,
            LocalDate from,
            LocalDate to
    );

}
