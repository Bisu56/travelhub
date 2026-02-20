package com.travelhub.repository;

import com.travelhub.entity.FlightBooking;
import com.travelhub.entity.User;
import com.travelhub.entity.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FlightBookingRepository extends JpaRepository<FlightBooking, Long> {

    List<FlightBooking> findByUser(User user);

    Optional<FlightBooking> findByBookingReference(String bookingReference);

    List<FlightBooking> findByBookingStatus(BookingStatus status);

}