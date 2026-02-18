package com.travelhub.service;

import com.travelhub.entity.DestinationPackage;
import com.travelhub.entity.User;
import com.travelhub.entity.enums.PackageStatus;
import com.travelhub.entity.enums.Role;
import com.travelhub.repository.DestinationPackageRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class DestinationAgentService {

    private final DestinationPackageRepository repository;

    public DestinationPackage create(DestinationPackage pkg, User agent) {

        if (agent.getRole() != Role.AGENT)
            throw new RuntimeException("Only agent allowed");

        pkg.setCreatedBy(agent);
        pkg.setStatus(PackageStatus.DRAFT);
        return repository.save(pkg);
    }

    public DestinationPackage update(Long id, DestinationPackage updated, User agent) {

        DestinationPackage existing = getOwned(id, agent);

        if (existing.getStatus() == PackageStatus.PUBLISHED)
            throw new RuntimeException("Cannot edit published package");

        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setBasePrice(updated.getBasePrice());
        existing.setDiscountPrice(updated.getDiscountPrice());
        existing.setDurationDays(updated.getDurationDays());

        return repository.save(existing);
    }

    public void delete(Long id, User agent) {
        DestinationPackage pkg = getOwned(id, agent);
        pkg.setIsDeleted(true);
    }

    public DestinationPackage submit(Long id, User agent) {
        DestinationPackage pkg = getOwned(id, agent);
        pkg.setStatus(PackageStatus.PENDING_APPROVAL);
        return repository.save(pkg);
    }

    private DestinationPackage getOwned(Long id, User agent) {
        DestinationPackage pkg = repository.findById(id)
                .orElseThrow();

        if (!pkg.getCreatedBy().getId().equals(agent.getId()))
            throw new RuntimeException("Unauthorized");

        return pkg;
    }
}
