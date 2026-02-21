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

@Service
@RequiredArgsConstructor
@Transactional
public class VehicleService {

    private final VehicleRepository vehicleRepository;
    private final VehicleBookingRepository bookingRepository;
    private final ReviewService reviewService;
    private final AuditService auditService;

    public VehicleResponseDTO createVehicle(User agent, VehicleRequestDTO dto) {
        if (agent.getRole() != Role.AGENT)
            throw new ForbiddenException("Only agents allowed");

        validateVehicle(dto);

        VehicleOffering vehicle = VehicleMapper.toEntity(dto, agent);
        vehicle.setApprovalStatus(PackageStatus.DRAFT);
        vehicleRepository.save(vehicle);

        return VehicleMapper.toDTO(vehicle);
    }

    public VehicleResponseDTO updateVehicle(User agent, Long id, VehicleRequestDTO dto) {
        VehicleOffering vehicle = getOwnedVehicle(agent, id);
        validateVehicle(dto);

        vehicle.setVehicleType(dto.getVehicleType());
        vehicle.setDescription(dto.getDescription());
        vehicle.setLocation(dto.getLocation());
        vehicle.setPricePerSeat(dto.getPricePerSeat());
        vehicle.setFullVehiclePricePerDay(dto.getFullVehiclePricePerDay());
        vehicle.setTotalSeats(dto.getTotalSeats());
        vehicle.setAvailableSeats(dto.getTotalSeats());

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

        vehicle.setApprovalStatus(PackageStatus.APPROVED);
        vehicle.setApprovedBy(admin);
        vehicle.setApprovedAt(Instant.now());
        vehicle.setRejectionReason(null);
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
        vehicle.setApprovedBy(null);
        vehicle.setApprovedAt(null);
        vehicleRepository.save(vehicle);

        auditService.log(admin.getEmail(), "REJECTED VEHICLE " + id, ip);
        return VehicleMapper.toDTO(vehicle);
    }

    public VehicleResponseDTO publishVehicle(User admin, Long id, String ip) {
        checkAdmin(admin);
        VehicleOffering vehicle = getVehicle(id);
        if (vehicle.getApprovalStatus() != PackageStatus.APPROVED)
            throw new BadRequestException("Only APPROVED vehicles can be published");

        vehicle.setApprovalStatus(PackageStatus.PUBLISHED);
        vehicleRepository.save(vehicle);

        auditService.log(admin.getEmail(), "PUBLISHED VEHICLE " + id, ip);
        return VehicleMapper.toDTO(vehicle);
    }

    public void deleteVehicle(User admin, Long id, String ip) {
        checkAdmin(admin);
        VehicleOffering vehicle = getVehicle(id);
        vehicle.setActive(false);
        vehicleRepository.save(vehicle);

        auditService.log(admin.getEmail(), "DELETED VEHICLE " + id, ip);
    }

    public void suspendVehicle(User admin, Long id, String ip) {
        checkAdmin(admin);
        VehicleOffering vehicle = getVehicle(id);
        if (vehicle.getApprovalStatus() != PackageStatus.PUBLISHED)
            throw new BadRequestException("Only PUBLISHED vehicles can be suspended");

        vehicle.setApprovalStatus(PackageStatus.SUSPENDED);
        vehicleRepository.save(vehicle);

        auditService.log(admin.getEmail(), "SUSPENDED VEHICLE " + id, ip);
    }

    public List<VehicleResponseDTO> searchVehicles(String location, LocalDate startDate, LocalDate endDate, Double minPrice, Double maxPrice) {
        return vehicleRepository.findByApprovalStatusAndActiveTrue(PackageStatus.PUBLISHED)
                .stream()
                .filter(v -> location == null || v.getLocation().equalsIgnoreCase(location))
                .filter(v -> minPrice == null || (v.getPricePerSeat() != null && v.getPricePerSeat().doubleValue() >= minPrice))
                .filter(v -> maxPrice == null || (v.getPricePerSeat() != null && v.getPricePerSeat().doubleValue() <= maxPrice))
                .map(VehicleMapper::toDTO)
                .toList();
    }

    public VehicleBookingResponseDTO bookVehicle(User user, Long vehicleId, VehicleBookingRequest request) {
        VehicleOffering vehicle = getVehicle(vehicleId);
        if (vehicle.getApprovalStatus() != PackageStatus.PUBLISHED)
            throw new BadRequestException("Vehicle not available");

        BigDecimal totalPrice;
        if (request.getFullVehicle()) {
            totalPrice = vehicle.getFullVehiclePricePerDay().multiply(BigDecimal.valueOf(request.getDays()));
        } else {
            if (request.getSeats() <= 0 || request.getSeats() > vehicle.getAvailableSeats())
                throw new BadRequestException("Invalid seat count");

            totalPrice = vehicle.getPricePerSeat().multiply(BigDecimal.valueOf(request.getSeats()));
        }

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
                .toList();
    }

    private void validateVehicle(VehicleRequestDTO dto) {
        if (dto.getTotalSeats() == null || dto.getTotalSeats() <= 0)
            throw new BadRequestException("Total seats must be > 0");

        if ((dto.getPricePerSeat() == null || dto.getPricePerSeat().compareTo(BigDecimal.ZERO) <= 0) &&
                (dto.getFullVehiclePricePerDay() == null || dto.getFullVehiclePricePerDay().compareTo(BigDecimal.ZERO) <= 0))
            throw new BadRequestException("Either seat price or full vehicle price must be > 0");
    }

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

    private void checkBookingPermission(User actor, VehicleBooking booking) {
        boolean isAdmin = actor.getRole() == Role.ADMIN;
        boolean isAgent = actor.getRole() == Role.AGENT &&
                booking.getVehicle().getCreatedBy().getId().equals(actor.getId());
        if (!isAdmin && !isAgent)
            throw new ForbiddenException("Unauthorized");
    }
}