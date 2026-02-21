package com.travelhub.repository;

import com.travelhub.entity.VehicleOffering;
import com.travelhub.entity.enums.PackageStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<VehicleOffering, Long> {

    List<VehicleOffering> findByApprovalStatusAndActiveTrue(PackageStatus status);

    List<VehicleOffering> findByCreatedByIdAndActiveTrue(Long agentId);

    List<VehicleOffering> findByCreatedByIdAndApprovalStatusAndActiveTrue(Long agentId, PackageStatus status);
}