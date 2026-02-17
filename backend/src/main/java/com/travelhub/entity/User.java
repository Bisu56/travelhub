package com.travelhub.entity;
import com.travelhub.entity.enums.AccountStatus;
import com.travelhub.entity.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.stereotype.Component;

import java.time.Instant;
@Getter
@Setter
@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(unique = true, nullable = false)
    private String phone;

    private String FirstName;
    private String LastName;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private AccountStatus accountStatus;

    private Boolean emailVerified = false;
    private Boolean phoneVerified = false;

    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();
}
