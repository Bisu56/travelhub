package com.travelhub.service;

import com.travelhub.entity.DestinationPackage;
import com.travelhub.entity.enums.PackageStatus;
import com.travelhub.repository.DestinationPackageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DestinationAdminService {

    private final DestinationPackageRepository repository;

    public DestinationPackage approve(Long id) {
        DestinationPackage pkg = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Package not found"));

        pkg.setStatus(PackageStatus.APPROVED);
        return repository.save(pkg);
    }

    public DestinationPackage reject(Long id) {
        DestinationPackage pkg = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Package not found"));

        pkg.setStatus(PackageStatus.REJECTED);
        return repository.save(pkg);
    }

    public DestinationPackage publish(Long id) {
        DestinationPackage pkg = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Package not found"));

        pkg.setStatus(PackageStatus.PUBLISHED);
        return repository.save(pkg);
    }
}
