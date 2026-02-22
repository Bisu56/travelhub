package com.travelhub.repository;

import com.travelhub.entity.VehicleOffering;
import com.travelhub.entity.enums.PackageStatus;
import com.travelhub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VehicleOfferingRepository extends JpaRepository<VehicleOffering, Long> {
    List<VehicleOffering> findByApprovalStatus(PackageStatus status);
    List<VehicleOffering> findByCreatedBy(User agent);
}