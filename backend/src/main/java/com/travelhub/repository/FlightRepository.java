package com.travelhub.repository;

import com.travelhub.entity.Flight;
import com.travelhub.entity.enums.PackageStatus;
import com.travelhub.entity.enums.DestinationType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import jakarta.persistence.LockModeType;
import java.time.LocalDateTime;
import java.util.Optional;

public interface FlightRepository extends JpaRepository<Flight, Long>, JpaSpecificationExecutor<Flight> {

    // USER SEARCH
    Page<Flight> findByOriginIgnoreCaseAndDestinationIgnoreCaseAndDepartureTimeBetweenAndStatus(
            String origin,
            String destination,
            LocalDateTime start,
            LocalDateTime end,
            PackageStatus status,
            Pageable pageable,
            String DestinationType
    );

    // LOCK FOR BOOKING
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT f FROM Flight f WHERE f.id = :id AND f.isDeleted = false")
    Optional<Flight> findByIdForUpdate(@Param("id") Long id);

}