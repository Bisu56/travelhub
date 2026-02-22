package com.travelhub.service;

import com.travelhub.Dtos.*;
import com.travelhub.Mapper.VehicleMapper;
import com.travelhub.entity.*;
import com.travelhub.entity.enums.*;
import com.travelhub.exception.*;
import com.travelhub.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

/**
 * VehicleService manages CRUD, approval, search, and booking flows for vehicles.
 * Includes agent/admin role checks, booking validation, and cart integration.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class VehicleService {

    private final VehicleOfferingRepository vehicleRepository;
    private final VehicleBookingRepository bookingRepository;
    private final ReviewService reviewService;
    private final AuditService auditService;

    // ---------------- Vehicle CRUD & Approval ----------------

    public VehicleResponseDTO createVehicle(User agent, VehicleRequestDTO dto) {
        validateAgent(agent);
        validateVehicle(dto);

        VehicleOffering vehicle = VehicleMapper.toEntity(dto, agent);
        vehicle.setApprovalStatus(PackageStatus.DRAFT);
        vehicleRepository.save(vehicle);

        return VehicleMapper.toDTO(vehicle);
    }

    public VehicleResponseDTO updateVehicle(User agent, Long id, VehicleRequestDTO dto) {
        validateAgent(agent);
        validateVehicle(dto);

        VehicleOffering vehicle = getOwnedVehicle(agent, id);

        vehicle.setVehicleType(dto.getVehicleType());
        vehicle.setDescription(dto.getDescription());
        vehicle.setLocation(dto.getLocation());
        vehicle.setTotalSeats(dto.getTotalSeats());
        vehicle.setPricePerSeat(dto.getPricePerSeat());
        vehicle.setFullVehiclePricePerDay(dto.getFullVehiclePricePerDay());

        if (vehicle.getApprovalStatus() == PackageStatus.PUBLISHED) {
            vehicle.setApprovalStatus(PackageStatus.SUBMITTED);
        } else {
            vehicle.setApprovalStatus(PackageStatus.DRAFT);
        }

        vehicleRepository.save(vehicle);
        return VehicleMapper.toDTO(vehicle);
    }

    public VehicleResponseDTO submitVehicle(User agent, Long id) {
        VehicleOffering vehicle = getOwnedVehicle(agent, id);
        vehicle.setApprovalStatus(PackageStatus.SUBMITTED);
        vehicleRepository.save(vehicle);
        return VehicleMapper.toDTO(vehicle);
    }

    public VehicleResponseDTO approveVehicle(User admin, Long id, String ip) {
        checkAdmin(admin);
        VehicleOffering vehicle = getVehicle(id);

        if (vehicle.getApprovalStatus() != PackageStatus.SUBMITTED)
            throw new BadRequestException("Only SUBMITTED vehicles can be approved");

        vehicle.setApprovalStatus(PackageStatus.PUBLISHED);
        vehicle.setApprovedBy(admin);
        vehicle.setApprovedAt(Instant.now());
        vehicleRepository.save(vehicle);

        auditService.log(admin.getEmail(), "APPROVED VEHICLE " + id, ip);
        return VehicleMapper.toDTO(vehicle);
    }

    public VehicleResponseDTO rejectVehicle(User admin, Long id, String reason, String ip) {
        checkAdmin(admin);
        VehicleOffering vehicle = getVehicle(id);

        if (vehicle.getApprovalStatus() != PackageStatus.SUBMITTED)
            throw new BadRequestException("Only SUBMITTED vehicles can be rejected");

        vehicle.setApprovalStatus(PackageStatus.REJECTED);
        vehicle.setRejectionReason(reason);
        vehicleRepository.save(vehicle);

        auditService.log(admin.getEmail(), "REJECTED VEHICLE " + id, ip);
        return VehicleMapper.toDTO(vehicle);
    }

    public void deleteVehicle(User admin, Long id, String ip) {
        checkAdmin(admin);
        VehicleOffering vehicle = getVehicle(id);
        vehicle.setActive(false);
        vehicleRepository.save(vehicle);

        auditService.log(admin.getEmail(), "DELETED VEHICLE " + id, ip);
    }

    public List<VehicleResponseDTO> listPendingVehicles() {
        return vehicleRepository.findByApprovalStatus(PackageStatus.SUBMITTED)
                .stream().map(VehicleMapper::toDTO).collect(Collectors.toList());
    }

    // ---------------- Search & Listing ----------------

    public List<VehicleResponseDTO> searchVehicles(String location, LocalDate startDate, LocalDate endDate,
                                                   Double minPrice, Double maxPrice) {
        return vehicleRepository.findAll()
                .stream()
                .filter(VehicleOffering::getActive)
                .filter(v -> v.getApprovalStatus() == PackageStatus.PUBLISHED)
                .filter(v -> location == null || v.getLocation().equalsIgnoreCase(location))
                .filter(v -> minPrice == null || v.getPricePerSeat().doubleValue() >= minPrice
                        || v.getFullVehiclePricePerDay().doubleValue() >= minPrice)
                .filter(v -> maxPrice == null || v.getPricePerSeat().doubleValue() <= maxPrice
                        || v.getFullVehiclePricePerDay().doubleValue() <= maxPrice)
                .map(VehicleMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<VehicleResponseDTO> getVehiclesByAgent(User agent) {
        return vehicleRepository.findByCreatedBy(agent)
                .stream().map(VehicleMapper::toDTO).collect(Collectors.toList());
    }

    // ---------------- Booking ----------------

    public VehicleBookingResponseDTO bookVehicle(User user, Long vehicleId, VehicleBookingRequest request) {
        VehicleOffering vehicle = getVehicle(vehicleId);
        validateBookingAvailability(vehicle);
        validateBookingRequest(vehicle, request);

        BigDecimal totalPrice = calculatePrice(vehicle, request);
        VehicleBooking booking = VehicleBooking.builder()
                .user(user)
                .vehicle(vehicle)
                .seatCount(request.getFullVehicle() ? vehicle.getTotalSeats() : request.getSeats())
                .days(request.getDays())
                .fullVehicle(request.getFullVehicle())
                .totalPrice(totalPrice)
                .bookingStatus(BookingStatus.PENDING)
                .paymentStatus(PaymentStatus.UNPAID)
                .build();

        bookingRepository.save(booking);
        return VehicleMapper.bookingToDTO(booking);
    }

    public void cancelBooking(User user, Long bookingId) {
        VehicleBooking booking = getBooking(bookingId);
        if (!booking.getUser().getId().equals(user.getId()))
            throw new ForbiddenException("Not your booking");
        if (booking.getBookingStatus() == BookingStatus.COMPLETED)
            throw new BadRequestException("Cannot cancel completed booking");

        booking.setBookingStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }

    public void confirmBooking(User actor, Long bookingId) {
        VehicleBooking booking = getBooking(bookingId);
        if (booking.getBookingStatus() != BookingStatus.PENDING)
            throw new BadRequestException("Only PENDING bookings allowed");

        checkBookingPermission(actor, booking);
        booking.setBookingStatus(BookingStatus.CONFIRMED);
        bookingRepository.save(booking);
    }

    public void completeBooking(User actor, Long bookingId) {
        VehicleBooking booking = getBooking(bookingId);
        if (booking.getBookingStatus() != BookingStatus.CONFIRMED)
            throw new BadRequestException("Only CONFIRMED bookings allowed");

        checkBookingPermission(actor, booking);
        booking.setBookingStatus(BookingStatus.COMPLETED);
        bookingRepository.save(booking);
    }

    public void rejectBooking(User actor, Long bookingId, String reason) {
        VehicleBooking booking = getBooking(bookingId);
        if (booking.getBookingStatus() != BookingStatus.PENDING)
            throw new BadRequestException("Only PENDING bookings can be rejected");

        checkBookingPermission(actor, booking);
        booking.setBookingStatus(BookingStatus.REJECTED);
        booking.setRejectionReason(reason);
        bookingRepository.save(booking);
    }

    public List<VehicleBookingResponseDTO> getUserBookings(User user) {
        return bookingRepository.findByUser(user)
                .stream().map(VehicleMapper::bookingToDTO).collect(Collectors.toList());
    }

    public List<VehicleBookingResponseDTO> getBookingsForAgent(User agent) {
        return bookingRepository.findByVehicle_CreatedBy(agent)
                .stream().map(VehicleMapper::bookingToDTO).collect(Collectors.toList());
    }

    public List<VehicleBookingResponseDTO> getAllBookings() {
        return bookingRepository.findAll()
                .stream().map(VehicleMapper::bookingToDTO).collect(Collectors.toList());
    }

    // ---------------- Reviews ----------------

    public ReviewResponseDTO addReview(User user, Long vehicleId, Integer rating, String comment) {
        Review review = reviewService.addReview(vehicleId, rating, comment, user);
        return ReviewResponseDTO.builder()
                .id(review.getId())
                .packageId(review.getReferenceId())
                .userId(user.getId())
                .userEmail(user.getEmail())
                .rating(review.getRating())
                .comment(review.getComment())
                .build();
    }

    public List<ReviewResponseDTO> getReviews(Long vehicleId) {
        return reviewService.getReviews(vehicleId)
                .stream()
                .map(r -> ReviewResponseDTO.builder()
                        .id(r.getId())
                        .packageId(r.getReferenceId())
                        .userId(r.getUser().getId())
                        .userEmail(r.getUser().getEmail())
                        .rating(r.getRating())
                        .comment(r.getComment())
                        .build())
                .collect(Collectors.toList());
    }

    // ---------------- Cart Integration ----------------

    public BigDecimal getPriceForCart(AddToCartRequest request) {
        VehicleOffering vehicle = getVehicle(request.getReferenceId());
        long days = request.getStartDate().until(request.getEndDate()).getDays() + 1;
        boolean fullVehicle = request.getQuantity() != null && request.getQuantity() >= vehicle.getTotalSeats();

        if (fullVehicle) {
            return vehicle.getFullVehiclePricePerDay().multiply(BigDecimal.valueOf(days));
        } else {
            return vehicle.getPricePerSeat()
                    .multiply(BigDecimal.valueOf(request.getQuantity()))
                    .multiply(BigDecimal.valueOf(days));
        }
    }

    public VehicleBookingResponseDTO createBookingFromCart(User user, CartItem item) {
        VehicleOffering vehicle = getVehicle(item.getReferenceId());
        validateBookingAvailability(vehicle);

        VehicleBooking booking = VehicleBooking.builder()
                .user(user)
                .vehicle(vehicle)
                .seatCount(item.getQuantity() != null ? item.getQuantity() : vehicle.getTotalSeats())
                .days(item.getStartDate().until(item.getEndDate()).getDays() + 1)
                .fullVehicle(item.getQuantity() == null || item.getQuantity() >= vehicle.getTotalSeats())
                .totalPrice(item.getSubtotal())
                .bookingStatus(BookingStatus.PENDING)
                .paymentStatus(PaymentStatus.UNPAID)
                .build();

        bookingRepository.save(booking);
        return VehicleMapper.bookingToDTO(booking);
    }

    // ---------------- Internal Helpers ----------------

    private VehicleOffering getVehicle(Long id) {
        return vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
    }

    private VehicleBooking getBooking(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    private VehicleOffering getOwnedVehicle(User agent, Long id) {
        VehicleOffering vehicle = getVehicle(id);
        if (!vehicle.getCreatedBy().getId().equals(agent.getId()))
            throw new ForbiddenException("Not your vehicle");
        return vehicle;
    }

    private void checkAdmin(User user) {
        if (user.getRole() != Role.ADMIN)
            throw new ForbiddenException("Admin only");
    }

    private void validateAgent(User user) {
        if (user.getRole() != Role.AGENT)
            throw new ForbiddenException("Agent only");
    }

    private void validateVehicle(VehicleRequestDTO dto) {
        if (dto.getTotalSeats() == null || dto.getTotalSeats() <= 0)
            throw new BadRequestException("Total seats must be > 0");
        if (dto.getPricePerSeat() == null || dto.getPricePerSeat().compareTo(BigDecimal.ZERO) <= 0)
            throw new BadRequestException("Price per seat must be > 0");
        if (dto.getFullVehiclePricePerDay() == null || dto.getFullVehiclePricePerDay().compareTo(BigDecimal.ZERO) <= 0)
            throw new BadRequestException("Full vehicle price per day must be > 0");
    }

    private void validateBookingRequest(VehicleOffering vehicle, VehicleBookingRequest request) {
        if (!request.getFullVehicle()) {
            if (request.getSeats() == null || request.getSeats() < 1)
                throw new BadRequestException("Invalid seat count");
            if (request.getSeats() > vehicle.getTotalSeats())
                throw new BadRequestException("Seats exceed vehicle capacity");
        }
        if (request.getDays() == null || request.getDays() < 1)
            throw new BadRequestException("Invalid number of days");
    }

    private void validateBookingAvailability(VehicleOffering vehicle) {
        if (vehicle.getApprovalStatus() != PackageStatus.PUBLISHED)
            throw new BadRequestException("Vehicle not available");
    }

    private BigDecimal calculatePrice(VehicleOffering vehicle, VehicleBookingRequest request) {
        if (request.getFullVehicle()) {
            return vehicle.getFullVehiclePricePerDay().multiply(BigDecimal.valueOf(request.getDays()));
        } else {
            BigDecimal seatPrice = vehicle.getPricePerSeat().multiply(BigDecimal.valueOf(request.getSeats()));
            return seatPrice.multiply(BigDecimal.valueOf(request.getDays()));
        }
    }

    private void checkBookingPermission(User actor, VehicleBooking booking) {
        boolean isAdmin = actor.getRole() == Role.ADMIN;
        boolean isAgent = actor.getRole() == Role.AGENT &&
                booking.getVehicle().getCreatedBy().getId().equals(actor.getId());
        if (!isAdmin && !isAgent)
            throw new ForbiddenException("Unauthorized");
    }
    public BigDecimal getPriceById(Long vehicleId, LocalDate startDate, LocalDate endDate, Integer seats, Boolean fullVehicle) {
        VehicleOffering vehicle = getVehicle(vehicleId); // existing helper
        validateBookingAvailability(vehicle);

        int days = (startDate != null && endDate != null) ? (int) (endDate.toEpochDay() - startDate.toEpochDay() + 1) : 1;
        int seatCount = (seats != null && seats > 0) ? seats : vehicle.getTotalSeats();

        if (fullVehicle != null && fullVehicle) {
            return vehicle.getFullVehiclePricePerDay().multiply(BigDecimal.valueOf(days));
        } else {
            return vehicle.getPricePerSeat().multiply(BigDecimal.valueOf(seatCount)).multiply(BigDecimal.valueOf(days));
        }
    }
}
