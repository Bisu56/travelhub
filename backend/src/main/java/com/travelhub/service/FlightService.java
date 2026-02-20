package com.travelhub.service;

import com.travelhub.Dtos.*;
import com.travelhub.entity.*;
import com.travelhub.entity.enums.*;
import com.travelhub.exception.*;
import com.travelhub.repository.*;
import com.travelhub.Mapper.FlightMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class FlightService {

    private final FlightRepository flightRepository;
    private final FlightBookingRepository bookingRepository;
    private final ReviewService reviewService;
    private final AuditService auditService;

    // ======================= FLIGHT CRUD =======================

    public FlightResponseDTO createFlight(User agent, FlightRequestDTO dto) {
        if(agent.getRole() != Role.AGENT) throw new ForbiddenException("Only agents can create flights");
        Flight flight = FlightMapper.toEntity(dto, agent);
        flight.setStatus(PackageStatus.DRAFT);
        flight.calculateFinalPrice();
        flightRepository.save(flight);
        return FlightMapper.toDTO(flight);
    }

    public FlightResponseDTO updateFlight(User agent, Long id, FlightRequestDTO dto) {
        Flight flight = getOwnedFlight(id, agent);
        updateFields(flight, dto);
        flight.calculateFinalPrice();
        flightRepository.save(flight);
        return FlightMapper.toDTO(flight);
    }

    public FlightResponseDTO submitFlight(User agent, Long id) {
        Flight flight = getOwnedFlight(id, agent);
        flight.setStatus(PackageStatus.SUBMITTED);
        flightRepository.save(flight);
        return FlightMapper.toDTO(flight);
    }

    public void deleteFlight(User agent, Long id) {
        Flight flight = getOwnedFlight(id, agent);
        flight.setIsDeleted(true);
        flightRepository.save(flight);
    }

    // ======================= ADMIN ACTIONS =======================

    public FlightResponseDTO approveFlight(User admin, Long id, String ip) {
        Flight flight = getFlight(id);
        checkAdmin(admin);
        if(flight.getStatus() != PackageStatus.SUBMITTED) throw new BadRequestException("Only SUBMITTED flights can be approved");
        flight.setStatus(PackageStatus.APPROVED);
        flight.setApprovedBy(admin);
        flight.setApprovedAt(LocalDateTime.now());
        flight.setRejectionReason(null);
        flightRepository.save(flight);
        auditService.log(admin.getEmail(), "APPROVED FLIGHT " + id, ip);
        return FlightMapper.toDTO(flight);
    }

    public FlightResponseDTO rejectFlight(User admin, Long id, String reason, String ip) {
        Flight flight = getFlight(id);
        checkAdmin(admin);
        if(flight.getStatus() != PackageStatus.SUBMITTED) throw new BadRequestException("Only SUBMITTED flights can be rejected");
        flight.setStatus(PackageStatus.REJECTED);
        flight.setRejectionReason(reason);
        flight.setApprovedBy(null);
        flight.setApprovedAt(null);
        flightRepository.save(flight);
        auditService.log(admin.getEmail(), "REJECTED FLIGHT " + id + " REASON: " + reason, ip);
        return FlightMapper.toDTO(flight);
    }

    public FlightResponseDTO publishFlight(User admin, Long id, String ip) {
        Flight flight = getFlight(id);
        checkAdmin(admin);
        if(flight.getStatus() != PackageStatus.APPROVED) throw new BadRequestException("Only APPROVED flights can be published");
        flight.setStatus(PackageStatus.PUBLISHED);
        flightRepository.save(flight);
        auditService.log(admin.getEmail(), "PUBLISHED FLIGHT " + id, ip);
        return FlightMapper.toDTO(flight);
    }

    public List<FlightResponseDTO> listPendingFlights() {
        return flightRepository.findByStatusAndIsDeletedFalse(PackageStatus.SUBMITTED)
                .stream().map(FlightMapper::toDTO).toList();
    }

    // ======================= USER SEARCH =======================

    public List<FlightResponseDTO> searchFlights(String origin, String destination, LocalDateTime start, LocalDateTime end) {
        return flightRepository.findAll(PageRequest.of(0, 50)) // simple search placeholder
                .stream()
                .filter(f -> f.getStatus() == PackageStatus.PUBLISHED)
                .filter(f -> origin == null || f.getOrigin().equalsIgnoreCase(origin))
                .filter(f -> destination == null || f.getDestination().equalsIgnoreCase(destination))
                .filter(f -> start == null || !f.getDepartureTime().isBefore(start))
                .filter(f -> end == null || !f.getDepartureTime().isAfter(end))
                .map(FlightMapper::toDTO)
                .toList();
    }

    // ======================= BOOKINGS =======================

    public FlightBookingResponseDTO bookFlight(User user, Long flightId, Integer seats) {
        Flight flight = getFlightForUpdate(flightId);

        if(flight.getStatus() != PackageStatus.PUBLISHED) throw new BadRequestException("Flight not available");
        if(seats > flight.getAvailableSeats()) throw new BadRequestException("Not enough seats available");

        BigDecimal totalPrice = flight.getFinalPrice().multiply(BigDecimal.valueOf(seats));

        FlightBooking booking = FlightBooking.builder()
                .user(user)
                .flight(flight)
                .numberOfSeats(seats)
                .totalPrice(totalPrice)
                .bookingStatus(BookingStatus.PENDING)
                .paymentStatus(PaymentStatus.UNPAID)
                .build();

        flight.setAvailableSeats(flight.getAvailableSeats() - seats);

        bookingRepository.save(booking);
        flightRepository.save(flight);

        return FlightBookingResponseDTO.builder()
                .id(booking.getId())
                .flightId(flight.getId())
                .flightNumber(flight.getFlightNumber())
                .numberOfSeats(seats)
                .totalPrice(totalPrice)
                .bookingStatus(booking.getBookingStatus().name())
                .paymentStatus(booking.getPaymentStatus().name())
                .build();
    }

    public void cancelBooking(User user, Long bookingId) {
        FlightBooking booking = getBooking(bookingId);
        if(!booking.getUser().getId().equals(user.getId())) throw new ForbiddenException("Not your booking");
        if(booking.getBookingStatus() == BookingStatus.COMPLETED) throw new BadRequestException("Cannot cancel completed booking");

        booking.setBookingStatus(BookingStatus.CANCELLED);
        Flight flight = booking.getFlight();
        flight.setAvailableSeats(flight.getAvailableSeats() + booking.getNumberOfSeats());
        bookingRepository.save(booking);
        flightRepository.save(flight);
    }

    public void confirmBooking(User actor, Long bookingId) {
        FlightBooking booking = getBooking(bookingId);
        if(booking.getBookingStatus() != BookingStatus.PENDING) throw new BadRequestException("Only PENDING bookings can be confirmed");
        checkBookingPermission(actor, booking);
        booking.setBookingStatus(BookingStatus.CONFIRMED);
        bookingRepository.save(booking);
    }

    public void completeBooking(User actor, Long bookingId) {
        FlightBooking booking = getBooking(bookingId);
        if(booking.getBookingStatus() != BookingStatus.CONFIRMED) throw new BadRequestException("Only CONFIRMED bookings can be completed");
        checkBookingPermission(actor, booking);
        booking.setBookingStatus(BookingStatus.COMPLETED);
        bookingRepository.save(booking);
    }

    public List<FlightBookingResponseDTO> getUserBookings(User user) {
        return bookingRepository.findByUser(user).stream()
                .map(b -> FlightBookingResponseDTO.builder()
                        .id(b.getId())
                        .flightId(b.getFlight().getId())
                        .flightNumber(b.getFlight().getFlightNumber())
                        .numberOfSeats(b.getNumberOfSeats())
                        .totalPrice(b.getTotalPrice())
                        .bookingStatus(b.getBookingStatus().name())
                        .paymentStatus(b.getPaymentStatus().name())
                        .build())
                .toList();
    }

    public List<FlightBookingResponseDTO> getBookingsForAgent(User agent) {
        List<Long> flightIds = flightRepository.findByCreatedByAndIsDeletedFalse(agent)
                .stream().map(Flight::getId).toList();

        return bookingRepository.findByFlightIdIn(flightIds).stream()
                .map(b -> FlightBookingResponseDTO.builder()
                        .id(b.getId())
                        .flightId(b.getFlight().getId())
                        .flightNumber(b.getFlight().getFlightNumber())
                        .numberOfSeats(b.getNumberOfSeats())
                        .totalPrice(b.getTotalPrice())
                        .bookingStatus(b.getBookingStatus().name())
                        .paymentStatus(b.getPaymentStatus().name())
                        .build())
                .toList();
    }

    public List<ReviewResponseDTO> getReviewsForFlight(User agent) {
        List<Long> flightIds = flightRepository.findByCreatedByAndIsDeletedFalse(agent)
                .stream().map(Flight::getId).toList();

        return flightIds.stream()
                .flatMap(fId -> reviewService.getReviews(fId).stream())
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

    // ======================= HELPERS =======================

    private Flight getFlight(Long id) {
        return flightRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flight not found"));
    }

    private Flight getOwnedFlight(Long id, User agent) {
        Flight flight = getFlight(id);
        if(!flight.getCreatedBy().getId().equals(agent.getId())) throw new ForbiddenException("Not your flight");
        return flight;
    }

    private Flight getFlightForUpdate(Long id) {
        return flightRepository.findByIdForUpdate(id)
                .orElseThrow(() -> new RuntimeException("Flight not found"));
    }

    private FlightBooking getBooking(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    private void checkAdmin(User admin) { if(admin.getRole() != Role.ADMIN) throw new ForbiddenException("Only admin allowed"); }

    private void checkBookingPermission(User actor, FlightBooking booking) {
        boolean isAdmin = actor.getRole() == Role.ADMIN;
        boolean isAgent = actor.getRole() == Role.AGENT &&
                booking.getFlight().getCreatedBy().getId().equals(actor.getId());
        if(!isAdmin && !isAgent) throw new ForbiddenException("Unauthorized to act on booking");
    }

    private void updateFields(Flight flight, FlightRequestDTO dto) {
        flight.setFlightNumber(dto.getFlightNumber());
        flight.setOrigin(dto.getOrigin());
        flight.setDestination(dto.getDestination());
        flight.setDepartureTime(dto.getDepartureTime());
        flight.setArrivalTime(dto.getArrivalTime());
        flight.setFlightClass(dto.getFlightClass());
        flight.setAvailableSeats(dto.getAvailableSeats());
        flight.setBasePrice(dto.getBasePrice());
    }
}