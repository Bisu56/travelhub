package com.travelhub.repository;

import com.travelhub.entity.DestinationPackage;
import com.travelhub.entity.User;
import com.travelhub.entity.enums.PackageStatus;
import com.travelhub.entity.enums.DestinationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface DestinationPackageRepository extends JpaRepository<DestinationPackage, Long> {

    List<DestinationPackage> findByCreatedByAndIsDeletedFalse(User agent);

    List<DestinationPackage> findByStatus(PackageStatus status);

    List<DestinationPackage> findByCountryAndTypeAndStatusAndAvailableFromLessThanEqualAndAvailableToGreaterThanEqual(
            String country, DestinationType type, PackageStatus status, LocalDate from, LocalDate to
    );
}
