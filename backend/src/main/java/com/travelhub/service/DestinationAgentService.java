package com.travelhub.service;
import com.travelhub.Dtos.DestinationRequestDTO;
import com.travelhub.entity.DestinationPackage;
import com.travelhub.entity.PackageInclusionDetails;
import com.travelhub.entity.User;
import com.travelhub.entity.enums.PackageStatus;
import com.travelhub.repository.DestinationPackageRepository;
import com.travelhub.Mapper.DestinationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DestinationAgentService {

    private final DestinationPackageRepository repository;

    public DestinationPackage create(DestinationRequestDTO request, User agent) {
        DestinationPackage pkg = DestinationMapper.toEntity(request, agent);
        pkg.setStatus(PackageStatus.DRAFT);
        pkg.calculateFinalPrice();
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
        pkg.setDiscountPercentage(request.getDiscountPercentage());
        pkg.setMaxPeople(request.getMaxPeople());
        pkg.setImageUrls(request.getImageUrls());

        if (pkg.getInclusionDetails() == null) pkg.setInclusionDetails(new PackageInclusionDetails());

        if (request.getIncludesHotel() != null) pkg.getInclusionDetails().setIncludesHotel(request.getIncludesHotel());
        if (request.getIncludesFlight() != null) pkg.getInclusionDetails().setIncludesFlight(request.getIncludesFlight());
        if (request.getIncludesFood() != null) pkg.getInclusionDetails().setIncludesFood(request.getIncludesFood());
        if (request.getIncludesTransport() != null) pkg.getInclusionDetails().setIncludesTransport(request.getIncludesTransport());
        pkg.getInclusionDetails().setHotelType(request.getHotelType());
        pkg.getInclusionDetails().setFlightClass(request.getFlightClass());


        validatePackage(pkg);

        pkg.calculateFinalPrice();

        pkg.setStatus(PackageStatus.DRAFT);

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

        if (!pkg.getCreatedBy().getId().equals(agent.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        return pkg;
    }

    private void validatePackage(DestinationPackage pkg) {
        if (pkg.getBasePrice() == null || pkg.getBasePrice().compareTo(BigDecimal.ZERO) <= 0)
            throw new IllegalArgumentException("Base price must be greater than zero");

        if (pkg.getDurationDays() == null || pkg.getDurationDays() <= 0)
            throw new IllegalArgumentException("Duration days must be greater than zero");

        if (pkg.getAvailableFrom() != null && pkg.getAvailableTo() != null &&
                pkg.getAvailableFrom().isAfter(pkg.getAvailableTo()))
            throw new IllegalArgumentException("Available from date cannot be after available to date");

        if (pkg.getDiscountPercentage() != null &&
                (pkg.getDiscountPercentage().compareTo(BigDecimal.ZERO) < 0 ||
                        pkg.getDiscountPercentage().compareTo(BigDecimal.valueOf(100)) > 0))
            throw new IllegalArgumentException("Discount percentage must be between 0 and 100");
    }
}
