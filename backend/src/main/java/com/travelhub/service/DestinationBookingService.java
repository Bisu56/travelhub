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

    public DestinationBooking book(Long packageId,
                                   Integer people,
                                   LocalDate travelDate,
                                   User user) {

        DestinationPackage pkg = packageRepository.findById(packageId)
                .orElseThrow();

        if (pkg.getStatus() != PackageStatus.PUBLISHED)
            throw new RuntimeException("Package not available");

        BigDecimal pricePerPerson =
                pkg.getDiscountPrice() != null
                        ? pkg.getDiscountPrice()
                        : pkg.getBasePrice();

        BigDecimal total =
                pricePerPerson.multiply(BigDecimal.valueOf(people));

        DestinationBooking booking =
                DestinationBooking.builder()
                        .user(user)
                        .destinationPackage(pkg)
                        .numberOfPeople(people)
                        .travelDate(travelDate)
                        .totalPrice(total)
                        .bookingStatus(BookingStatus.PENDING)
                        .paymentStatus(PaymentStatus.UNPAID)
                        .build();

        return bookingRepository.save(booking);
    }

    public void cancel(Long bookingId, User user) {
        DestinationBooking booking =
                bookingRepository.findById(bookingId).orElseThrow();

        if (!booking.getUser().getId().equals(user.getId()))
            throw new RuntimeException("Unauthorized");

        booking.setBookingStatus(BookingStatus.CANCELLED);
    }
}
