package com.travelhub.repository;
import com.travelhub.entity.DestinationBooking;
import com.travelhub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DestinationBookingRepository
        extends JpaRepository<DestinationBooking, Long> {

    List<DestinationBooking> findByUser(User user);
}

