package com.travelhub.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.travelhub.entity.PhoneOtp;

public interface PhoneOtpRepository extends JpaRepository<PhoneOtp, Long> {

    Optional<PhoneOtp> findTopByPhoneOrderByExpiryDateDesc(String phone);
}

