package com.travelhub.service;
import com.travelhub.entity.Flight;
import com.travelhub.entity.FlightBooking;
import com.travelhub.entity.User;
import com.travelhub.entity.enums.BookingStatus;
import com.travelhub.entity.enums.PackageStatus;
import com.travelhub.entity.enums.PaymentStatus;
import com.travelhub.entity.enums.Role;
import com.travelhub.exception.BadRequestException;
import com.travelhub.exception.ForbiddenException;
import com.travelhub.exception.ResourceNotFoundException;
import com.travelhub.repository.FlightBookingRepository;
import com.travelhub.repository.FlightRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class FlightBookingService {

    private final FlightRepository flightRepository;
    private final FlightBookingRepository bookingRepository;

    public FlightBooking book(Long flightId,
                              Integer passengers,
                              String flightClass,
                              User user) {

        Flight flight = flightRepository.findByIdForUpdate(flightId)
                .orElseThrow(() -> new ResourceNotFoundException("Flight not found"));

        if (flight.getStatus() != PackageStatus.PUBLISHED)
            throw new BadRequestException("Flight not available for booking");

        if (flight.getDepartureTime().isBefore(LocalDateTime.now()))
            throw new BadRequestException("Cannot book past flights");

        BigDecimal price;
        int availableSeats;

        switch (flightClass.toUpperCase()) {

            case "ECONOMY" -> {
                availableSeats = flight.getEconomyAvailableSeats();
                price = flight.getEconomyPrice();
                validateSeats(availableSeats, passengers, "Economy");
                flight.setEconomyAvailableSeats(availableSeats - passengers);
            }

            case "PREMIUM_ECONOMY" -> {
                availableSeats = flight.getPremiumEconomyAvailableSeats();
                price = flight.getPremiumEconomyPrice();
                validateSeats(availableSeats, passengers, "Premium Economy");
                flight.setPremiumEconomyAvailableSeats(availableSeats - passengers);
            }

            case "BUSINESS" -> {
                availableSeats = flight.getBusinessAvailableSeats();
                price = flight.getBusinessPrice();
                validateSeats(availableSeats, passengers, "Business");
                flight.setBusinessAvailableSeats(availableSeats - passengers);
            }

            case "FIRST_CLASS" -> {
                availableSeats = flight.getFirstClassAvailableSeats();
                price = flight.getFirstClassPrice();
                validateSeats(availableSeats, passengers, "First Class");
                flight.setFirstClassAvailableSeats(availableSeats - passengers);
            }

            default -> throw new BadRequestException("Invalid flight class");
        }

        BigDecimal totalAmount = price.multiply(BigDecimal.valueOf(passengers));

        FlightBooking booking = FlightBooking.builder()
                .user(user)
                .flight(flight)
                .passengersCount(passengers)
                .totalAmount(totalAmount)
                .bookingStatus(BookingStatus.PENDING)
                .paymentStatus(PaymentStatus.UNPAID)
                .build();

        return bookingRepository.save(booking);
    }

    public void cancel(Long bookingId, User user) {

        FlightBooking booking = getBooking(bookingId);

        if (!booking.getUser().getId().equals(user.getId()))
            throw new ForbiddenException("Not your booking");

        if (booking.getBookingStatus() == BookingStatus.COMPLETED)
            throw new BadRequestException("Completed booking cannot be cancelled");

        restoreSeats(booking);

        booking.setBookingStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }

    public void confirmBooking(Long bookingId, User actor) {

        FlightBooking booking = getBooking(bookingId);

        if (booking.getBookingStatus() != BookingStatus.PENDING)
            throw new BadRequestException("Only PENDING bookings can be confirmed");

        boolean isAdmin = actor.getRole() == Role.ADMIN;

        boolean isAgent = actor.getRole() == Role.AGENT &&
                booking.getFlight().getAirlineName() != null; // Replace later with createdBy check

        if (!isAdmin && !isAgent)
            throw new ForbiddenException("Unauthorized to confirm");

        booking.setBookingStatus(BookingStatus.CONFIRMED);
        bookingRepository.save(booking);
    }

    public void completeBooking(Long bookingId, User actor) {

        FlightBooking booking = getBooking(bookingId);

        if (booking.getBookingStatus() != BookingStatus.CONFIRMED)
            throw new BadRequestException("Only CONFIRMED bookings can be completed");

        boolean isAdmin = actor.getRole() == Role.ADMIN;

        boolean isAgent = actor.getRole() == Role.AGENT;

        if (!isAdmin && !isAgent)
            throw new ForbiddenException("Unauthorized to complete");

        booking.setBookingStatus(BookingStatus.COMPLETED);
        bookingRepository.save(booking);
    }

    public List<FlightBooking> getUserBookings(User user) {
        return bookingRepository.findByUser(user);
    }

    private FlightBooking getBooking(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
    }

    private void validateSeats(int available, int requested, String className) {
        if (available < requested)
            throw new BadRequestException("Not enough " + className + " seats available");
    }

    private void restoreSeats(FlightBooking booking) {

        Flight flight = booking.getFlight();
        int passengers = booking.getPassengersCount();

        switch (booking.getFlightClassType()) {

            case ECONOMY ->
                    flight.setEconomyAvailableSeats(
                            flight.getEconomyAvailableSeats() + passengers);

            case PREMIUM_ECONOMY ->
                    flight.setPremiumEconomyAvailableSeats(
                            flight.getPremiumEconomyAvailableSeats() + passengers);

            case BUSINESS ->
                    flight.setBusinessAvailableSeats(
                            flight.getBusinessAvailableSeats() + passengers);

            case FIRST_CLASS ->
                    flight.setFirstClassAvailableSeats(
                            flight.getFirstClassAvailableSeats() + passengers);
        }
    }
}