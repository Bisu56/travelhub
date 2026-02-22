package com.travelhub.repository;

import com.travelhub.entity.VehicleBooking;
import com.travelhub.entity.User;
import com.travelhub.entity.VehicleOffering;
import com.travelhub.entity.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VehicleBookingRepository extends JpaRepository<VehicleBooking, Long> {

    List<VehicleBooking> findByUser(User user);

    List<VehicleBooking> findByVehicle(VehicleOffering vehicle);

    List<VehicleBooking> findByVehicle_CreatedBy(User agent);

    List<VehicleBooking> findByBookingStatus(BookingStatus status);
}