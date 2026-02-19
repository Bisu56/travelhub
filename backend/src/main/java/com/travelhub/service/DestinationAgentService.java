package com.travelhub.service;

import com.travelhub.Dtos.DestinationRequestDTO;
import com.travelhub.entity.DestinationPackage;
import com.travelhub.entity.User;
import com.travelhub.entity.enums.PackageStatus;
import com.travelhub.repository.DestinationPackageRepository;
import com.travelhub.Mapper.DestinationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DestinationAgentService {

    private final DestinationPackageRepository repository;

    public DestinationPackage create(DestinationRequestDTO request, User agent) {
        DestinationPackage pkg = DestinationMapper.toEntity(request, agent);
        pkg.setStatus(PackageStatus.DRAFT);
        return repository.save(pkg);
    }

    public DestinationPackage update(Long id, DestinationRequestDTO request, User agent) {
        DestinationPackage pkg = getOwnedPackage(id, agent);

        pkg.setTitle(request.getTitle());
        pkg.setDescription(request.getDescription());
        pkg.setCountry(request.getCountry());
        pkg.setCity(request.getCity());
        pkg.setType(request.getType());
        pkg.setDurationDays(request.getDurationDays());
        pkg.setAvailableFrom(request.getAvailableFrom());
        pkg.setAvailableTo(request.getAvailableTo());
        pkg.setBasePrice(request.getBasePrice());
        pkg.setDiscountPrice(request.getDiscountPrice());
        pkg.setMaxPeople(request.getMaxPeople());
        pkg.setImageUrls(request.getImageUrls());

        pkg.setStatus(PackageStatus.DRAFT); // reset before resubmitting
        return repository.save(pkg);
    }

    public void delete(Long id, User agent) {
        DestinationPackage pkg = getOwnedPackage(id, agent);
        pkg.setIsDeleted(true);
        repository.save(pkg);
    }

    public DestinationPackage submit(Long id, User agent) {
        DestinationPackage pkg = getOwnedPackage(id, agent);
        pkg.setStatus(PackageStatus.SUBMITTED);
        return repository.save(pkg);
    }

    public List<DestinationPackage> getAgentPackages(User agent) {
        return repository.findByCreatedByAndIsDeletedFalse(agent);
    }

    private DestinationPackage getOwnedPackage(Long id, User agent) {
        DestinationPackage pkg = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Package not found"));

        if (!pkg.getCreatedBy().getId().equals(agent.getId()))
            throw new RuntimeException("Unauthorized");

        return pkg;
    }
}
