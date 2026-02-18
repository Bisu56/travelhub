package com.travelhub.repository;
import com.travelhub.entity.DestinationPackage;
import com.travelhub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
public interface DestinationPackageRepository
        extends JpaRepository<DestinationPackage, Long>,
        JpaSpecificationExecutor<DestinationPackage> {

    List<DestinationPackage> findByCreatedByAndIsDeletedFalse(User agent);
}
