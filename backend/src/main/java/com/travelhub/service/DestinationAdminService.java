package com.travelhub.service;
import com.travelhub.entity.DestinationBooking;
import com.travelhub.entity.DestinationPackage;
import com.travelhub.entity.enums.BookingStatus;
import com.travelhub.entity.enums.PackageStatus;
import com.travelhub.entity.enums.Role;
import com.travelhub.repository.DestinationBookingRepository;
import com.travelhub.repository.DestinationPackageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import com.travelhub.Dtos.DestinationRequestDTO;
import com.travelhub.entity.User;
import java.time.Instant;

@Service
@RequiredArgsConstructor
public class DestinationAdminService {

    private final DestinationPackageRepository repository;
    private final DestinationBookingRepository bookingRepository;

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


        DestinationPackage saved = repository.save(pkg);

        auditService.log(admin.getEmail(),
                "ADMIN EDITED PACKAGE ID: " + id,
                ip);

        return saved;
    }

    public DestinationPackage approve(Long id, User admin, String ip) {

        DestinationPackage pkg = getPackage(id);

        if (pkg.getStatus() != PackageStatus.SUBMITTED) {
            throw new RuntimeException("Only SUBMITTED packages can be approved");
        }

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

        if (pkg.getStatus() != PackageStatus.SUBMITTED) {
            throw new RuntimeException("Only SUBMITTED packages can be rejected");
        }

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

        if (pkg.getStatus() != PackageStatus.APPROVED) {
            throw new RuntimeException("Only APPROVED packages can be published");
        }

        pkg.setStatus(PackageStatus.PUBLISHED);

        DestinationPackage saved = repository.save(pkg);

        auditService.log(admin.getEmail(),
                "ADMIN PUBLISHED PACKAGE ID: " + id,
                ip);

        return saved;
    }

    public List<DestinationPackage> listPendingPackages() {
        return repository.findAll()
                .stream()
                .filter(p -> p.getStatus() == PackageStatus.SUBMITTED)
                .toList();
    }

    private DestinationPackage getPackage(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Package not found"));
    }

        public void markBookingCompleted(Long bookingId, User actor) {
            DestinationBooking booking = bookingRepository.findById(bookingId)
                    .orElseThrow(() -> new RuntimeException("Booking not found"));

            boolean isAdmin = actor.getRole() == Role.ADMIN;
            boolean isAgent = actor.getRole() == Role.AGENT &&
                    booking.getDestinationPackage().getCreatedBy().getId().equals(actor.getId());

            if (!isAdmin && !isAgent) {
                throw new RuntimeException("Unauthorized");
            }

            booking.setBookingStatus(BookingStatus.COMPLETED);
            bookingRepository.save(booking);

            sendCompletionNotification(booking);
        }

        private void sendCompletionNotification(DestinationBooking booking) {
            System.out.println("Notification: Dear " + booking.getUser().getEmail() +
                    ", your trip to " + booking.getDestinationPackage().getTitle() +
                    " is completed! Please leave a review.");
        }
    }
