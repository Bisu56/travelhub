package com.travelhub.service;

import com.travelhub.Dtos.DestinationRequestDTO;
import com.travelhub.entity.DestinationPackage;
import com.travelhub.entity.User;
import com.travelhub.entity.enums.PackageStatus;
import com.travelhub.repository.DestinationPackageRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class DestinationAdminService {

    private final DestinationPackageRepository repository;
    private final AuditService auditService;

    public DestinationPackage edit(Long id,
                                   DestinationRequestDTO request,
                                   User admin,
                                   String ip) {

        DestinationPackage pkg = getPackage(id);

        if (pkg.getStatus() != PackageStatus.SUBMITTED &&
                pkg.getStatus() != PackageStatus.APPROVED) {
            throw new RuntimeException("Only SUBMITTED or APPROVED packages can be edited");
        }

        updateFields(pkg, request);

        validatePackage(pkg);

        pkg.calculateFinalPrice();

        DestinationPackage saved = repository.save(pkg);

        auditService.log(admin.getEmail(),
                "ADMIN EDITED PACKAGE ID: " + id,
                ip);

        return saved;
    }

    public DestinationPackage approve(Long id, User admin, String ip) {
        DestinationPackage pkg = getPackage(id);

        if (pkg.getStatus() != PackageStatus.SUBMITTED)
            throw new RuntimeException("Only SUBMITTED packages can be approved");

        pkg.setStatus(PackageStatus.APPROVED);
        pkg.setApprovedBy(admin);
        pkg.setApprovedAt(Instant.now());
        pkg.setRejectionReason(null);

        DestinationPackage saved = repository.save(pkg);

        auditService.log(admin.getEmail(),
                "ADMIN APPROVED PACKAGE ID: " + id,
                ip);

        return saved;
    }

    public DestinationPackage reject(Long id,
                                     String reason,
                                     User admin,
                                     String ip) {

        DestinationPackage pkg = getPackage(id);

        if (pkg.getStatus() != PackageStatus.SUBMITTED)
            throw new RuntimeException("Only SUBMITTED packages can be rejected");

        pkg.setStatus(PackageStatus.REJECTED);
        pkg.setRejectionReason(reason);
        pkg.setApprovedBy(null);
        pkg.setApprovedAt(null);

        DestinationPackage saved = repository.save(pkg);

        auditService.log(admin.getEmail(),
                "ADMIN REJECTED PACKAGE ID: " + id + " REASON: " + reason,
                ip);

        return saved;
    }

    public DestinationPackage publish(Long id, User admin, String ip) {
        DestinationPackage pkg = getPackage(id);

        if (pkg.getStatus() != PackageStatus.APPROVED)
            throw new RuntimeException("Only APPROVED packages can be published");

        pkg.setStatus(PackageStatus.PUBLISHED);

        DestinationPackage saved = repository.save(pkg);

        auditService.log(admin.getEmail(),
                "ADMIN PUBLISHED PACKAGE ID: " + id,
                ip);

        return saved;
    }

    public List<DestinationPackage> listPendingPackages() {
        return repository.findByStatus(PackageStatus.SUBMITTED);
    }

    private DestinationPackage getPackage(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Package not found"));
    }

    private void updateFields(DestinationPackage pkg,
                              DestinationRequestDTO request) {

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
    }

    private void validatePackage(DestinationPackage pkg) {

        if (pkg.getBasePrice() == null ||
                pkg.getBasePrice().compareTo(BigDecimal.ZERO) <= 0)
            throw new IllegalArgumentException("Base price must be > 0");

        if (pkg.getDurationDays() == null ||
                pkg.getDurationDays() <= 0)
            throw new IllegalArgumentException("Duration must be > 0");

        if (pkg.getAvailableFrom() != null &&
                pkg.getAvailableTo() != null &&
                pkg.getAvailableFrom().isAfter(pkg.getAvailableTo()))
            throw new IllegalArgumentException("Invalid date range");

        if (pkg.getDiscountPercentage() != null &&
                (pkg.getDiscountPercentage().compareTo(BigDecimal.ZERO) < 0 ||
                        pkg.getDiscountPercentage().compareTo(BigDecimal.valueOf(100)) > 0))
            throw new IllegalArgumentException("Discount must be 0-100");
    }
}