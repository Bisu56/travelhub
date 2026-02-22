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
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class DestinationService {

    private final DestinationPackageRepository packageRepository;
    private final DestinationBookingRepository bookingRepository;
    private final ReviewService reviewService;
    private final AuditService auditService;


    public DestinationResponseDTO createPackage(User agent, DestinationRequestDTO dto) {
        validateAgent(agent);
        DestinationPackage pkg = DestinationMapper.toEntity(dto, agent);
        pkg.setStatus(PackageStatus.DRAFT);
        pkg.calculateFinalPrice();
        packageRepository.save(pkg);
        return DestinationMapper.toDTO(pkg);
    }

    public DestinationResponseDTO updatePackage(User actor, Long id, DestinationRequestDTO dto) {
        DestinationPackage pkg = getPackage(id);
        validateUpdatePermission(actor, pkg);

        updateFields(pkg, dto);
        validatePackage(pkg);
        pkg.calculateFinalPrice();
        packageRepository.save(pkg);

        return DestinationMapper.toDTO(pkg);
    }

    public void deletePackage(User admin, Long id) {
        checkAdmin(admin);
        DestinationPackage pkg = getPackage(id);
        pkg.setIsDeleted(true);
        packageRepository.save(pkg);
        auditService.log(admin.getEmail(), "DELETED PACKAGE " + id, null);
    }

    public DestinationResponseDTO submitPackage(User agent, Long id) {
        DestinationPackage pkg = getOwnedPackage(id, agent);
        pkg.setStatus(PackageStatus.SUBMITTED);
        packageRepository.save(pkg);
        return DestinationMapper.toDTO(pkg);
    }

    public DestinationResponseDTO approvePackage(User admin, Long id, String ip) {
        checkAdmin(admin);
        DestinationPackage pkg = getPackage(id);

        if (pkg.getStatus() != PackageStatus.SUBMITTED)
            throw new BadRequestException("Only SUBMITTED packages can be approved");

        pkg.setStatus(PackageStatus.APPROVED);
        pkg.setApprovedBy(admin);
        pkg.setApprovedAt(Instant.now());
        pkg.setRejectionReason(null);
        packageRepository.save(pkg);

        auditService.log(admin.getEmail(), "APPROVED PACKAGE " + id, ip);
        return DestinationMapper.toDTO(pkg);
    }

    public DestinationResponseDTO publishPackage(User admin, Long id, String ip) {
        checkAdmin(admin);
        DestinationPackage pkg = getPackage(id);

        if (pkg.getStatus() != PackageStatus.APPROVED)
            throw new BadRequestException("Only APPROVED packages can be published");

        pkg.setStatus(PackageStatus.PUBLISHED);
        packageRepository.save(pkg);

        auditService.log(admin.getEmail(), "PUBLISHED PACKAGE " + id, ip);
        return DestinationMapper.toDTO(pkg);
    }


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
                .map(DestinationMapper::toDTO)
                .collect(Collectors.toList());
    }


    public DestinationBookingResponseDTO bookPackage(User user, Long packageId, Integer people, LocalDate travelDate) {
        DestinationPackage pkg = getPackage(packageId);
        validateBooking(pkg, people, travelDate);

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

        return DestinationMapper.toDTO(booking);
    }

    public void cancelBooking(User user, Long bookingId) {
        DestinationBooking booking = getBooking(bookingId);
        validateUserBooking(user, booking);
        booking.setBookingStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }

    public void confirmBooking(User actor, Long bookingId) {
        DestinationBooking booking = getBooking(bookingId);
        validateBookingStatus(booking, BookingStatus.PENDING);
        checkBookingPermission(actor, booking);
        booking.setBookingStatus(BookingStatus.CONFIRMED);
        bookingRepository.save(booking);
    }

    public void completeBooking(User actor, Long bookingId) {
        DestinationBooking booking = getBooking(bookingId);
        validateBookingStatus(booking, BookingStatus.CONFIRMED);
        checkBookingPermission(actor, booking);
        booking.setBookingStatus(BookingStatus.COMPLETED);
        bookingRepository.save(booking);
    }

    public void rejectBooking(User actor, Long bookingId, String reason) {
        DestinationBooking booking = getBooking(bookingId);
        validateBookingStatus(booking, BookingStatus.PENDING);
        checkBookingPermission(actor, booking);
        booking.setBookingStatus(BookingStatus.REJECTED);
        booking.setRejectionReason(reason);
        bookingRepository.save(booking);
    }


    public ReviewResponseDTO addReview(User user, Long packageId, Integer rating, String comment) {
        Review review = reviewService.addReview(packageId, rating, comment, user);
        return DestinationMapper.toReviewDTO(review, user);
    }

    public List<ReviewResponseDTO> getReviewsForPackage(Long packageId) {
        return reviewService.getReviews(packageId).stream()
                .map(r -> DestinationMapper.toReviewDTO(r, r.getUser()))
                .collect(Collectors.toList());
    }

    public List<ReviewResponseDTO> getReviewsForAgent(User agent) {
        List<Long> packageIds = packageRepository.findByCreatedByAndIsDeletedFalse(agent)
                .stream().map(DestinationPackage::getId).toList();

        return packageIds.stream()
                .flatMap(pkgId -> reviewService.getReviews(pkgId).stream())
                .map(r -> DestinationMapper.toReviewDTO(r, r.getUser()))
                .collect(Collectors.toList());
    }

    public List<ReviewResponseDTO> getAllReviews() {
        List<Long> packageIds = packageRepository.findAll()
                .stream()
                .filter(pkg -> !pkg.getIsDeleted())
                .map(DestinationPackage::getId)
                .toList();
        return packageIds.stream()
                .flatMap(pkgId -> reviewService.getReviews(pkgId).stream())
                .map(r -> DestinationMapper.toReviewDTO(r, r.getUser()))
                .collect(Collectors.toList());
    }


    public BigDecimal getPriceForCart(AddToCartRequest request) {
        DestinationPackage pkg = getPackage(request.getReferenceId());
        int quantity = request.getQuantity() != null ? request.getQuantity() : 1;
        return pkg.getFinalPrice().multiply(BigDecimal.valueOf(quantity));
    }

    public DestinationBooking createBookingFromCart(User user, CartItem item) {
        DestinationPackage pkg = getPackage(item.getReferenceId());

        DestinationBooking booking = DestinationBooking.builder()
                .user(user)
                .destinationPackage(pkg)
                .numberOfPeople(item.getQuantity())
                .travelDate(item.getTravelDate())
                .totalPrice(item.getSubtotal())
                .bookingStatus(BookingStatus.PENDING)
                .paymentStatus(PaymentStatus.UNPAID)
                .build();

        bookingRepository.save(booking);
        return booking;
    }

    public List<DestinationBookingResponseDTO> getUserBookings(User user) {
        return bookingRepository.findByUser(user).stream()
                .map(DestinationMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<DestinationBookingResponseDTO> getBookingsForAgent(User agent) {
        List<Long> packageIds = packageRepository.findByCreatedByAndIsDeletedFalse(agent)
                .stream().map(DestinationPackage::getId).toList();

        return bookingRepository.findByDestinationPackageIdIn(packageIds).stream()
                .map(DestinationMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<DestinationBookingResponseDTO> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(DestinationMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<DestinationResponseDTO> listPendingPackages() {
        return packageRepository.findByStatusAndIsDeletedFalse(PackageStatus.SUBMITTED)
                .stream().map(DestinationMapper::toDTO)
                .collect(Collectors.toList());
    }

    // ---------------- Internal Helpers ----------------

    private void validateAgent(User agent) {
        if (agent.getRole() != Role.AGENT)
            throw new ForbiddenException("Only agents allowed");
    }

    private void checkAdmin(User admin) {
        if (admin.getRole() != Role.ADMIN)
            throw new ForbiddenException("Only admin allowed");
    }

    private DestinationPackage getPackage(Long id) {
        return packageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Package not found"));
    }

    private DestinationPackage getOwnedPackage(Long id, User agent) {
        DestinationPackage pkg = getPackage(id);
        if (!pkg.getCreatedBy().getId().equals(agent.getId()))
            throw new ForbiddenException("Not your package");
        return pkg;
    }

    private DestinationBooking getBooking(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    private void validateUpdatePermission(User actor, DestinationPackage pkg) {
        if (actor.getRole() == Role.AGENT && !pkg.getCreatedBy().getId().equals(actor.getId()))
            throw new ForbiddenException("Not your package");
        if (actor.getRole() != Role.AGENT && actor.getRole() != Role.ADMIN)
            throw new ForbiddenException("Unauthorized");
    }

    private void validateBooking(DestinationPackage pkg, int people, LocalDate travelDate) {
        if (pkg.getStatus() != PackageStatus.PUBLISHED)
            throw new BadRequestException("Package not available");
        if (travelDate.isBefore(LocalDate.now()))
            throw new BadRequestException("Cannot book past dates");
        if (travelDate.isBefore(pkg.getAvailableFrom()) || travelDate.isAfter(pkg.getAvailableTo()))
            throw new BadRequestException("Travel date outside availability");
        if (people > pkg.getMaxPeople())
            throw new BadRequestException("Exceeds max allowed people");
    }

    private void validateBookingStatus(DestinationBooking booking, BookingStatus expected) {
        if (booking.getBookingStatus() != expected)
            throw new BadRequestException("Invalid booking status: " + booking.getBookingStatus());
    }

    private void validateUserBooking(User user, DestinationBooking booking) {
        if (!booking.getUser().getId().equals(user.getId()))
            throw new ForbiddenException("Not your booking");
        if (booking.getBookingStatus() == BookingStatus.COMPLETED)
            throw new BadRequestException("Cannot cancel completed booking");
    }

    private void checkBookingPermission(User actor, DestinationBooking booking) {
        boolean isAdmin = actor.getRole() == Role.ADMIN;
        boolean isAgent = actor.getRole() == Role.AGENT &&
                booking.getDestinationPackage().getCreatedBy().getId().equals(actor.getId());
        if (!isAdmin && !isAgent)
            throw new ForbiddenException("Unauthorized to act on booking");
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

        if (pkg.getInclusionDetails() == null) pkg.setInclusionDetails(new PackageInclusionDetails());
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
        if (pkg.getBasePrice() == null || pkg.getBasePrice().compareTo(BigDecimal.ZERO) <= 0)
            throw new BadRequestException("Base price must be > 0");
        if (pkg.getDurationDays() == null || pkg.getDurationDays() <= 0)
            throw new BadRequestException("Duration must be > 0");
        if (pkg.getAvailableFrom() != null && pkg.getAvailableTo() != null &&
                pkg.getAvailableFrom().isAfter(pkg.getAvailableTo()))
            throw new BadRequestException("Invalid date range");
        if (pkg.getDiscountPercentage() != null &&
                (pkg.getDiscountPercentage().compareTo(BigDecimal.ZERO) < 0 ||
                        pkg.getDiscountPercentage().compareTo(BigDecimal.valueOf(100)) > 0))
            throw new BadRequestException("Discount must be 0-100");
    }

    private boolean isMatch(String filter, String value) {
        return filter == null || (value != null && value.equalsIgnoreCase(filter));
    }

    private boolean isWithinTravelDate(DestinationPackage pkg, LocalDate date) {
        return pkg.getAvailableFrom() != null && pkg.getAvailableTo() != null &&
                !date.isBefore(pkg.getAvailableFrom()) && !date.isAfter(pkg.getAvailableTo());
    }

    private boolean inclusionMatch(PackageInclusionDetails details, Boolean hotel, Boolean flight, Boolean food, Boolean transport) {
        if (details == null) return false;
        return (hotel == null || Objects.equals(details.getIncludesHotel(), hotel)) &&
                (flight == null || Objects.equals(details.getIncludesFlight(), flight)) &&
                (food == null || Objects.equals(details.getIncludesFood(), food)) &&
                (transport == null || Objects.equals(details.getIncludesTransport(), transport));
    }
    public BigDecimal getPriceById(Long packageId, Integer quantity, LocalDate travelDate) {
        DestinationPackage pkg = getPackage(packageId); // existing helper
        int people = (quantity != null && quantity > 0) ? quantity : 1;

        // Optional: validate travel date
        if (travelDate != null && (travelDate.isBefore(pkg.getAvailableFrom()) || travelDate.isAfter(pkg.getAvailableTo()))) {
            throw new BadRequestException("Travel date outside availability");
        }

        return pkg.getFinalPrice().multiply(BigDecimal.valueOf(people));
    }
}