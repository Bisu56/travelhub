package com.travelhub.repository;

import com.travelhub.entity.VehicleBooking;
import com.travelhub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleBookingRepository extends JpaRepository<VehicleBooking, Long> {

    List<VehicleBooking> findByUser(User user);

    List<VehicleBooking> findByVehicleIdIn(List<Long> vehicleIds);
}