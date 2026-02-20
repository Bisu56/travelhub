package com.travelhub.service;
import com.travelhub.Dtos.*;
import com.travelhub.entity.*;
import com.travelhub.entity.enums.*;
import com.travelhub.exception.*;
import com.travelhub.repository.*;
import com.travelhub.Mapper.DestinationMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class DestinationService {

    private final DestinationPackageRepository packageRepository;
    private final DestinationBookingRepository bookingRepository;
    private final AuditService auditService;

    // ===== AGENT OPERATIONS =====

    public DestinationResponseDTO createPackage(User agent, DestinationRequestDTO dto) {
        if(agent.getRole() != Role.AGENT) throw new ForbiddenException("Only agents can create packages");
        DestinationPackage pkg = DestinationMapper.toEntity(dto, agent);
        pkg.setStatus(PackageStatus.DRAFT);
        pkg.calculateFinalPrice();
        packageRepository.save(pkg);
        return DestinationMapper.toDTO(pkg);
    }

    public DestinationResponseDTO updatePackage(User agent, Long id, DestinationRequestDTO dto) {
        DestinationPackage pkg = getOwnedPackage(id, agent);
        updateFields(pkg, dto);
        validatePackage(pkg);
        pkg.calculateFinalPrice();
        packageRepository.save(pkg);
        return DestinationMapper.toDTO(pkg);
    }

    public DestinationResponseDTO submitPackage(User agent, Long id) {
        DestinationPackage pkg = getOwnedPackage(id, agent);
        pkg.setStatus(PackageStatus.SUBMITTED);
        packageRepository.save(pkg);
        return DestinationMapper.toDTO(pkg);
    }

    public void deletePackage(User agent, Long id) {
        DestinationPackage pkg = getOwnedPackage(id, agent);
        pkg.setIsDeleted(true);
        packageRepository.save(pkg);
    }

    // ===== ADMIN OPERATIONS =====

    public DestinationResponseDTO approvePackage(User admin, Long id, String ip) {
        DestinationPackage pkg = getPackage(id);
        checkAdmin(admin);
        if(pkg.getStatus() != PackageStatus.SUBMITTED) throw new BadRequestException("Only SUBMITTED packages can be approved");
        pkg.setStatus(PackageStatus.APPROVED);
        pkg.setApprovedBy(admin);
        pkg.setApprovedAt(Instant.now());
        pkg.setRejectionReason(null);
        packageRepository.save(pkg);
        auditService.log(admin.getEmail(), "APPROVED PACKAGE "+id, ip);
        return DestinationMapper.toDTO(pkg);
    }

    public DestinationResponseDTO rejectPackage(User admin, Long id, String reason, String ip) {
        DestinationPackage pkg = getPackage(id);
        checkAdmin(admin);
        if(pkg.getStatus() != PackageStatus.SUBMITTED) throw new BadRequestException("Only SUBMITTED packages can be rejected");
        pkg.setStatus(PackageStatus.REJECTED);
        pkg.setRejectionReason(reason);
        pkg.setApprovedBy(null);
        pkg.setApprovedAt(null);
        packageRepository.save(pkg);
        auditService.log(admin.getEmail(), "REJECTED PACKAGE "+id+" REASON: "+reason, ip);
        return DestinationMapper.toDTO(pkg);
    }

    public DestinationResponseDTO publishPackage(User admin, Long id, String ip) {
        DestinationPackage pkg = getPackage(id);
        checkAdmin(admin);
        if(pkg.getStatus() != PackageStatus.APPROVED) throw new BadRequestException("Only APPROVED packages can be published");
        pkg.setStatus(PackageStatus.PUBLISHED);
        packageRepository.save(pkg);
        auditService.log(admin.getEmail(), "PUBLISHED PACKAGE "+id, ip);
        return DestinationMapper.toDTO(pkg);
    }

    public List<DestinationResponseDTO> listPendingPackages() {
        return packageRepository.findByStatus(PackageStatus.SUBMITTED).stream()
                .map(DestinationMapper::toDTO).toList();
    }

    // ===== SEARCH =====

    public List<DestinationResponseDTO> searchPackages(String country, String city, DestinationType type,
                                                       Double minPrice, Double maxPrice, LocalDate travelDate,
                                                       Boolean includesHotel, Boolean includesFlight,
                                                       Boolean includesFood, Boolean includesTransport) {

        return packageRepository.findByStatusAndIsDeletedFalse(PackageStatus.PUBLISHED).stream()
                .filter(p -> isMatch(country, p.getCountry()))
                .filter(p -> isMatch(city, p.getCity()))
                .filter(p -> type == null || p.getType() == type)
                .filter(p -> minPrice == null || p.getFinalPrice().doubleValue() >= minPrice)
                .filter(p -> maxPrice == null || p.getFinalPrice().doubleValue() <= maxPrice)
                .filter(p -> travelDate == null || isWithinTravelDate(p, travelDate))
                .filter(p -> inclusionMatch(p.getInclusionDetails(), includesHotel, includesFlight, includesFood, includesTransport))
                .map(DestinationMapper::toDTO).toList();
    }

    // ===== BOOKING =====

    public DestinationBookingResponseDTO bookPackage(User user, Long packageId, Integer people, LocalDate travelDate) {
        DestinationPackage pkg = getPackage(packageId);
        if(pkg.getStatus() != PackageStatus.PUBLISHED) throw new BadRequestException("Package not available");
        if(travelDate.isBefore(LocalDate.now())) throw new BadRequestException("Cannot book past dates");
        if(travelDate.isBefore(pkg.getAvailableFrom()) || travelDate.isAfter(pkg.getAvailableTo()))
            throw new BadRequestException("Travel date outside availability");
        if(people > pkg.getMaxPeople()) throw new BadRequestException("Exceeds max allowed people");

        BigDecimal totalPrice = pkg.getFinalPrice().multiply(BigDecimal.valueOf(people));

        DestinationBooking booking = DestinationBooking.builder()
                .user(user)
                .destinationPackage(pkg)
                .numberOfPeople(people)
                .travelDate(travelDate)
                .totalPrice(totalPrice)
                .bookingStatus(BookingStatus.PENDING)
                .paymentStatus(PaymentStatus.UNPAID)
                .build();

        bookingRepository.save(booking);

        return DestinationBookingResponseDTO.builder()
                .id(booking.getId())
                .packageId(pkg.getId())
                .packageTitle(pkg.getTitle())
                .travelDate(travelDate)
                .numberOfPeople(people)
                .totalPrice(totalPrice)
                .bookingStatus(booking.getBookingStatus().name())
                .paymentStatus(booking.getPaymentStatus().name())
                .build();
    }

    public void cancelBooking(User user, Long bookingId) {
        DestinationBooking booking = getBooking(bookingId);
        if(!booking.getUser().getId().equals(user.getId())) throw new ForbiddenException("Not your booking");
        if(booking.getBookingStatus() == BookingStatus.COMPLETED) throw new BadRequestException("Cannot cancel completed booking");
        booking.setBookingStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }

    public void confirmBooking(User actor, Long bookingId) {
        DestinationBooking booking = getBooking(bookingId);
        if(booking.getBookingStatus() != BookingStatus.PENDING) throw new BadRequestException("Only PENDING bookings can be confirmed");
        checkBookingPermission(actor, booking);
        booking.setBookingStatus(BookingStatus.CONFIRMED);
        bookingRepository.save(booking);
    }

    public void completeBooking(User actor, Long bookingId) {
        DestinationBooking booking = getBooking(bookingId);
        if(booking.getBookingStatus() != BookingStatus.CONFIRMED) throw new BadRequestException("Only CONFIRMED bookings can be completed");
        checkBookingPermission(actor, booking);
        booking.setBookingStatus(BookingStatus.COMPLETED);
        bookingRepository.save(booking);
    }

    // ===== PRIVATE HELPERS =====

    private DestinationPackage getPackage(Long id) {
        return packageRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Package not found"));
    }

    private DestinationBooking getBooking(Long id) {
        return bookingRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
    }

    private DestinationPackage getOwnedPackage(Long id, User agent) {
        DestinationPackage pkg = getPackage(id);
        if(!pkg.getCreatedBy().getId().equals(agent.getId())) throw new ForbiddenException("Not your package");
        return pkg;
    }

    private void checkAdmin(User admin) { if(admin.getRole() != Role.ADMIN) throw new ForbiddenException("Only admin allowed"); }

    private void checkBookingPermission(User actor, DestinationBooking booking) {
        boolean isAdmin = actor.getRole() == Role.ADMIN;
        boolean isAgent = actor.getRole() == Role.AGENT &&
                booking.getDestinationPackage().getCreatedBy().getId().equals(actor.getId());
        if(!isAdmin && !isAgent) throw new ForbiddenException("Unauthorized to act on booking");
    }

    private void updateFields(DestinationPackage pkg, DestinationRequestDTO dto) {
        pkg.setTitle(dto.getTitle());
        pkg.setDescription(dto.getDescription());
        pkg.setCountry(dto.getCountry());
        pkg.setCity(dto.getCity());
        pkg.setType(dto.getType());
        pkg.setDurationDays(dto.getDurationDays());
        pkg.setAvailableFrom(dto.getAvailableFrom());
        pkg.setAvailableTo(dto.getAvailableTo());
        pkg.setBasePrice(dto.getBasePrice());
        pkg.setDiscountPercentage(dto.getDiscountPercentage());
        pkg.setMaxPeople(dto.getMaxPeople());
        pkg.setImageUrls(dto.getImageUrls());

        if(pkg.getInclusionDetails() == null) pkg.setInclusionDetails(new PackageInclusionDetails());
        PackageInclusionDetails inc = pkg.getInclusionDetails();

        inc.setIncludesHotel(dto.getIncludesHotel());
        inc.setIncludesFlight(dto.getIncludesFlight());
        inc.setIncludesFood(dto.getIncludesFood());
        inc.setIncludesTransport(dto.getIncludesTransport());

        inc.setHotelCost(dto.getHotelCost());
        inc.setFlightCost(dto.getFlightCost());
        inc.setFoodCost(dto.getFoodCost());
        inc.setTransportCost(dto.getTransportCost());

        inc.setHotelType(dto.getHotelType());
        inc.setFlightClass(dto.getFlightClass());
    }

    private void validatePackage(DestinationPackage pkg) {
        if(pkg.getBasePrice() == null || pkg.getBasePrice().compareTo(BigDecimal.ZERO) <= 0)
            throw new BadRequestException("Base price must be > 0");
        if(pkg.getDurationDays() == null || pkg.getDurationDays() <= 0)
            throw new BadRequestException("Duration must be > 0");
        if(pkg.getAvailableFrom() != null && pkg.getAvailableTo() != null &&
                pkg.getAvailableFrom().isAfter(pkg.getAvailableTo()))
            throw new BadRequestException("Invalid date range");
        if(pkg.getDiscountPercentage() != null &&
                (pkg.getDiscountPercentage().compareTo(BigDecimal.ZERO) < 0 ||
                        pkg.getDiscountPercentage().compareTo(BigDecimal.valueOf(100)) > 0))
            throw new BadRequestException("Discount must be 0-100");
    }

    private boolean isMatch(String filter, String value) { return filter == null || (value != null && value.equalsIgnoreCase(filter)); }

    private boolean isWithinTravelDate(DestinationPackage p, LocalDate travelDate) {
        return p.getAvailableFrom() != null && p.getAvailableTo() != null &&
                !travelDate.isBefore(p.getAvailableFrom()) && !travelDate.isAfter(p.getAvailableTo());
    }

    private boolean inclusionMatch(PackageInclusionDetails d, Boolean h, Boolean f, Boolean food, Boolean t) {
        if(d == null) return false;
        return (h == null || d.getIncludesHotel().equals(h)) &&
                (f == null || d.getIncludesFlight().equals(f)) &&
                (food == null || d.getIncludesFood().equals(food)) &&
                (t == null || d.getIncludesTransport().equals(t));
    }
}