package com.travelhub.entity;
import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "phone_otps")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PhoneOtp {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String phone;
    private String otp;
    private Instant expiryDate;
    private int attempts = 0;
}
