package com.travelhub.repository;

import com.travelhub.entity.FlightBooking;
import com.travelhub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlightBookingRepository extends JpaRepository<FlightBooking, Long> {

    List<FlightBooking> findByUser(User user);

    List<FlightBooking> findByFlightIdIn(List<Long> flightIds);
}