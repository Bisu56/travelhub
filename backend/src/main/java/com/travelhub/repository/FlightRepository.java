package com.travelhub.repository;

import com.travelhub.entity.Flight;
import com.travelhub.entity.enums.PackageStatus;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FlightRepository extends JpaRepository<Flight, Long> {

    List<Flight> findByStatusAndIsDeletedFalse(PackageStatus status);

    List<Flight> findByCreatedByIdAndIsDeletedFalse(Long agentId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT f FROM Flight f WHERE f.id = :id AND f.isDeleted = false")
    Optional<Flight> findByIdForUpdate(@Param("id") Long id);
}