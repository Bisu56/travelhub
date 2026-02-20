package com.travelhub.service;

import com.travelhub.entity.DestinationBooking;
import com.travelhub.entity.DestinationPackage;
import com.travelhub.entity.User;
import com.travelhub.entity.enums.BookingStatus;
import com.travelhub.entity.enums.PackageStatus;
import com.travelhub.entity.enums.PaymentStatus;
import com.travelhub.entity.enums.Role;
import com.travelhub.exception.BadRequestException;
import com.travelhub.exception.ForbiddenException;
import com.travelhub.exception.ResourceNotFoundException;
import com.travelhub.repository.DestinationBookingRepository;
import com.travelhub.repository.DestinationPackageRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class DestinationBookingService {

    private final DestinationPackageRepository packageRepository;
    private final DestinationBookingRepository bookingRepository;


    public DestinationBooking book(Long packageId,
                                   Integer people,
                                   LocalDate travelDate,
                                   User user) {

        DestinationPackage pkg = packageRepository.findById(packageId)
                .orElseThrow(() -> new ResourceNotFoundException("Package not found"));

        if (pkg.getStatus() != PackageStatus.PUBLISHED)
            throw new BadRequestException("Package not available for booking");

        if (travelDate.isBefore(LocalDate.now()))
            throw new BadRequestException("Cannot book past dates");

        if (travelDate.isBefore(pkg.getAvailableFrom()) ||
                travelDate.isAfter(pkg.getAvailableTo()))
            throw new BadRequestException("Travel date outside availability");

        if (people > pkg.getMaxPeople())
            throw new BadRequestException("Exceeds maximum allowed people");

        BigDecimal totalPrice = pkg.getFinalPrice()
                .multiply(BigDecimal.valueOf(people));

        DestinationBooking booking = DestinationBooking.builder()
                .user(user)
                .destinationPackage(pkg)
                .numberOfPeople(people)
                .travelDate(travelDate)
                .totalPrice(totalPrice)
                .bookingStatus(BookingStatus.PENDING)
                .paymentStatus(PaymentStatus.UNPAID)
                .build();

        return bookingRepository.save(booking);
    }


    public void cancel(Long bookingId, User user) {

        DestinationBooking booking = getBooking(bookingId);

        if (!booking.getUser().getId().equals(user.getId()))
            throw new ForbiddenException("Not your booking");

        if (booking.getBookingStatus() == BookingStatus.COMPLETED)
            throw new BadRequestException("Completed booking cannot be cancelled");

        booking.setBookingStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }


    public void confirmBooking(Long bookingId, User actor) {

        DestinationBooking booking = getBooking(bookingId);

        if (booking.getBookingStatus() != BookingStatus.PENDING)
            throw new BadRequestException("Only PENDING bookings can be confirmed");

        boolean isAdmin = actor.getRole() == Role.ADMIN;

        boolean isAgent = actor.getRole() == Role.AGENT &&
                booking.getDestinationPackage().getCreatedBy()
                        .getId().equals(actor.getId());

        if (!isAdmin && !isAgent)
            throw new ForbiddenException("Unauthorized to confirm");

        booking.setBookingStatus(BookingStatus.CONFIRMED);
        bookingRepository.save(booking);
    }


    public void completeBooking(Long bookingId, User actor) {

        DestinationBooking booking = getBooking(bookingId);

        if (booking.getBookingStatus() != BookingStatus.CONFIRMED)
            throw new BadRequestException("Only CONFIRMED bookings can be completed");

        boolean isAdmin = actor.getRole() == Role.ADMIN;

        boolean isAgent = actor.getRole() == Role.AGENT &&
                booking.getDestinationPackage().getCreatedBy()
                        .getId().equals(actor.getId());

        if (!isAdmin && !isAgent)
            throw new ForbiddenException("Unauthorized to complete");

        booking.setBookingStatus(BookingStatus.COMPLETED);
        bookingRepository.save(booking);
    }


    public List<DestinationBooking> getUserBookings(User user) {
        return bookingRepository.findByUser(user);
    }


    private DestinationBooking getBooking(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
    }
}