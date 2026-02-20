package com.travelhub.repository;

import com.travelhub.entity.DestinationBooking;
import com.travelhub.entity.User;
import com.travelhub.entity.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DestinationBookingRepository extends JpaRepository<DestinationBooking, Long> {
    List<DestinationBooking> findByUser(User user);
    List<DestinationBooking> findByDestinationPackageIdIn(List<Long> packageIds);
    List<DestinationBooking> findByUserIdAndDestinationPackageIdAndBookingStatus(
                Long userId,
                Long packageId,
                BookingStatus status
        );
    }

