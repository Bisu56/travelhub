package com.travelhub.service;

import com.travelhub.entity.DestinationBooking;
import com.travelhub.entity.DestinationPackage;
import com.travelhub.entity.User;
import com.travelhub.entity.enums.BookingStatus;
import com.travelhub.entity.enums.PackageStatus;
import com.travelhub.entity.enums.PaymentStatus;
import com.travelhub.repository.DestinationBookingRepository;
import com.travelhub.repository.DestinationPackageRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Transactional
public class DestinationBookingService {

    private final DestinationPackageRepository packageRepository;
    private final DestinationBookingRepository bookingRepository;
//java docs for help
    /**
     * Book a destination package
     * @param packageId - Package to book
     * @param people - Number of travelers
     * @param travelDate - Date of travel
     * @param user - Booking user
     * @return DestinationBooking saved booking
     */
    public DestinationBooking book(Long packageId,
                                   Integer people,
                                   LocalDate travelDate,
                                   User user) {

        DestinationPackage pkg = packageRepository.findById(packageId)
                .orElseThrow(() -> new RuntimeException("Package not found"));

        if (pkg.getStatus() != PackageStatus.PUBLISHED)
            throw new RuntimeException("Package is not available for booking");

        if (pkg.getAvailableFrom() == null || pkg.getAvailableTo() == null) {
            throw new RuntimeException("Package availability dates not configured");
        }

        if (travelDate.isBefore(pkg.getAvailableFrom()) ||
                travelDate.isAfter(pkg.getAvailableTo())) {
            throw new RuntimeException("Travel date is outside available range");
        }

        if (people > pkg.getMaxPeople()) {
            throw new RuntimeException("Exceeds maximum allowed people for this package");
        }

        BigDecimal pricePerPerson = pkg.getFinalPrice();
        if (pricePerPerson == null) {
            throw new IllegalStateException("Package final price not calculated");
        }

        BigDecimal totalPrice = pricePerPerson.multiply(BigDecimal.valueOf(people));

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

    /**
     * Cancel a booking
     * @param bookingId - Booking to cancel
     * @param user - Booking user
     */
    public void cancel(Long bookingId, User user) {
        DestinationBooking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to cancel this booking");
        }

        if (booking.getBookingStatus() == BookingStatus.CANCELLED) {
            throw new RuntimeException("Booking already cancelled");
        }

        booking.setBookingStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }
}
