package com.travelhub.service;

import com.travelhub.Dtos.*;
import com.travelhub.Mapper.FlightMapper;
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
public class FlightService {

    private final FlightRepository flightRepository;
    private final FlightBookingRepository bookingRepository;
    private final ReviewService reviewService;
    private final AuditService auditService;


    public FlightResponseDTO createFlight(User agent, FlightRequestDTO dto) {

        if (agent.getRole() != Role.AGENT)
            throw new ForbiddenException("Only agents allowed");

        validateFlight(dto);

        Flight flight = FlightMapper.toEntity(dto, agent);
        flight.setStatus(PackageStatus.DRAFT);
        flight.calculateFinalPrice();

        flightRepository.save(flight);

        return FlightMapper.toDTO(flight);
    }

    public FlightResponseDTO updateFlight(User agent, Long id, FlightRequestDTO dto) {

        Flight flight = getOwnedFlight(agent, id);

        validateFlight(dto);

        flight.setAirlineName(dto.getAirlineName());
        flight.setFlightNumber(dto.getFlightNumber());
        flight.setDepartureCountry(dto.getDepartureCountry());
        flight.setDepartureCity(dto.getDepartureCity());
        flight.setArrivalCountry(dto.getArrivalCountry());
        flight.setArrivalCity(dto.getArrivalCity());
        flight.setType(dto.getType());
        flight.setDepartureDate(dto.getDepartureDate());
        flight.setArrivalDate(dto.getArrivalDate());
        flight.setBasePrice(dto.getBasePrice());
        flight.setDiscountPercentage(dto.getDiscountPercentage());
        flight.setTotalSeats(dto.getTotalSeats());
        flight.setImageUrls(dto.getImageUrls());

        flight.calculateFinalPrice();
        flightRepository.save(flight);

        return FlightMapper.toDTO(flight);
    }

    public FlightResponseDTO submitFlight(User agent, Long id) {

        Flight flight = getOwnedFlight(agent, id);
        flight.setStatus(PackageStatus.SUBMITTED);
        flightRepository.save(flight);

        return FlightMapper.toDTO(flight);
    }

    public void deleteFlight(User agent, Long id) {

        Flight flight = getOwnedFlight(agent, id);
        flight.setIsDeleted(true);
        flightRepository.save(flight);
    }


    public List<FlightResponseDTO> listPendingFlights() {

        return flightRepository
                .findByStatusAndIsDeletedFalse(PackageStatus.SUBMITTED)
                .stream()
                .map(FlightMapper::toDTO)
                .toList();
    }

    public FlightResponseDTO approveFlight(User admin, Long id, String ip) {

        checkAdmin(admin);

        Flight flight = getFlight(id);

        if (flight.getStatus() != PackageStatus.SUBMITTED)
            throw new BadRequestException("Only SUBMITTED flights can be approved");

        flight.setStatus(PackageStatus.APPROVED);
        flight.setApprovedBy(admin);
        flight.setApprovedAt(Instant.now());
        flight.setRejectionReason(null);

        flightRepository.save(flight);
        auditService.log(admin.getEmail(), "APPROVED FLIGHT " + id, ip);

        return FlightMapper.toDTO(flight);
    }

    public FlightResponseDTO rejectFlight(User admin, Long id, String reason, String ip) {

        checkAdmin(admin);

        Flight flight = getFlight(id);

        if (flight.getStatus() != PackageStatus.SUBMITTED)
            throw new BadRequestException("Only SUBMITTED flights can be rejected");

        flight.setStatus(PackageStatus.REJECTED);
        flight.setRejectionReason(reason);
        flight.setApprovedBy(null);
        flight.setApprovedAt(null);

        flightRepository.save(flight);
        auditService.log(admin.getEmail(), "REJECTED FLIGHT " + id, ip);

        return FlightMapper.toDTO(flight);
    }

    public FlightResponseDTO publishFlight(User admin, Long id, String ip) {

        checkAdmin(admin);

        Flight flight = getFlight(id);

        if (flight.getStatus() != PackageStatus.APPROVED)
            throw new BadRequestException("Only APPROVED flights can be published");

        flight.setStatus(PackageStatus.PUBLISHED);
        flightRepository.save(flight);

        auditService.log(admin.getEmail(), "PUBLISHED FLIGHT " + id, ip);

        return FlightMapper.toDTO(flight);
    }


    public List<FlightResponseDTO> searchFlights(String departureCity,
                                                 String arrivalCity,
                                                 DestinationType type,
                                                 LocalDate date,
                                                 Double minPrice,
                                                 Double maxPrice) {

        return flightRepository
                .findByStatusAndIsDeletedFalse(PackageStatus.PUBLISHED)
                .stream()
                .filter(f -> match(departureCity, f.getDepartureCity()))
                .filter(f -> match(arrivalCity, f.getArrivalCity()))
                .filter(f -> type == null || f.getType() == type)
                .filter(f -> date == null || f.getDepartureDate().equals(date))
                .filter(f -> minPrice == null || f.getFinalPrice().doubleValue() >= minPrice)
                .filter(f -> maxPrice == null || f.getFinalPrice().doubleValue() <= maxPrice)
                .map(FlightMapper::toDTO)
                .toList();
    }

    public FlightBookingResponseDTO bookFlight(User user,
                                               Long flightId,
                                               Integer passengers,
                                               FlightClassType flightClass) {

        Flight flight = getFlight(flightId);

        if (flight.getStatus() != PackageStatus.PUBLISHED)
            throw new BadRequestException("Flight not available");

        if (passengers <= 0)
            throw new BadRequestException("Invalid passenger count");

        BigDecimal total =
                flight.getFinalPrice()
                        .multiply(BigDecimal.valueOf(passengers));

        FlightBooking booking = FlightBooking.builder()
                .user(user)
                .flight(flight)
                .passengers(passengers)
                .flightClass(flightClass)
                .totalPrice(total)
                .bookingStatus(BookingStatus.PENDING)
                .paymentStatus(PaymentStatus.UNPAID)
                .build();

        bookingRepository.save(booking);

        return FlightMapper.bookingToDTO(booking);
    }

    public void cancelBooking(User user, Long bookingId) {

        FlightBooking booking = getBooking(bookingId);

        if (!booking.getUser().getId().equals(user.getId()))
            throw new ForbiddenException("Not your booking");

        if (booking.getBookingStatus() == BookingStatus.COMPLETED)
            throw new BadRequestException("Cannot cancel completed booking");

        booking.setBookingStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }

    public void confirmBooking(User actor, Long bookingId) {

        FlightBooking booking = getBooking(bookingId);

        if (booking.getBookingStatus() != BookingStatus.PENDING)
            throw new BadRequestException("Only PENDING bookings allowed");

        checkBookingPermission(actor, booking);

        booking.setBookingStatus(BookingStatus.CONFIRMED);
        bookingRepository.save(booking);
    }

    public void completeBooking(User actor, Long bookingId) {

        FlightBooking booking = getBooking(bookingId);

        if (booking.getBookingStatus() != BookingStatus.CONFIRMED)
            throw new BadRequestException("Only CONFIRMED bookings allowed");

        checkBookingPermission(actor, booking);

        booking.setBookingStatus(BookingStatus.COMPLETED);
        bookingRepository.save(booking);
    }

    public List<FlightBookingResponseDTO> getUserBookings(User user) {

        return bookingRepository.findByUser(user)
                .stream()
                .map(FlightMapper::bookingToDTO)
                .toList();
    }

    public List<FlightBookingResponseDTO> getBookingsForAgent(User agent) {

        List<Long> flightIds =
                flightRepository.findByCreatedByIdAndIsDeletedFalse(agent.getId())
                        .stream()
                        .map(Flight::getId)
                        .toList();

        return bookingRepository.findByFlightIdIn(flightIds)
                .stream()
                .map(FlightMapper::bookingToDTO)
                .toList();
    }



    public ReviewResponseDTO addReview(User user,
                                       Long flightId,
                                       Integer rating,
                                       String comment) {

        Review review = reviewService.addReview(flightId, rating, comment, user);

        return ReviewResponseDTO.builder()
                .id(review.getId())
                .packageId(review.getReferenceId())
                .userId(user.getId())
                .userEmail(user.getEmail())
                .rating(review.getRating())
                .comment(review.getComment())
                .build();
    }

    public List<ReviewResponseDTO> getReviews(Long flightId) {

        return reviewService.getReviews(flightId)
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


    private void validateFlight(FlightRequestDTO dto) {

        if (dto.getBasePrice() == null ||
                dto.getBasePrice().compareTo(BigDecimal.ZERO) <= 0)
            throw new BadRequestException("Base price must be > 0");

        if (dto.getDepartureDate().isAfter(dto.getArrivalDate()))
            throw new BadRequestException("Invalid flight dates");

        if (dto.getDiscountPercentage() != null &&
                (dto.getDiscountPercentage().compareTo(BigDecimal.ZERO) < 0 ||
                        dto.getDiscountPercentage().compareTo(BigDecimal.valueOf(100)) > 0))
            throw new BadRequestException("Discount must be 0-100");
    }

    private Flight getFlight(Long id) {
        return flightRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flight not found"));
    }

    private FlightBooking getBooking(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    private Flight getOwnedFlight(User agent, Long id) {

        Flight flight = getFlight(id);

        if (!flight.getCreatedBy().getId().equals(agent.getId()))
            throw new ForbiddenException("Not your flight");

        return flight;
    }

    private void checkAdmin(User user) {
        if (user.getRole() != Role.ADMIN)
            throw new ForbiddenException("Admin only");
    }

    private void checkBookingPermission(User actor, FlightBooking booking) {

        boolean isAdmin = actor.getRole() == Role.ADMIN;

        boolean isAgent = actor.getRole() == Role.AGENT &&
                booking.getFlight().getCreatedBy().getId()
                        .equals(actor.getId());

        if (!isAdmin && !isAgent)
            throw new ForbiddenException("Unauthorized");
    }

    private boolean match(String filter, String value) {
        return filter == null ||
                (value != null && value.equalsIgnoreCase(filter));
    }
}