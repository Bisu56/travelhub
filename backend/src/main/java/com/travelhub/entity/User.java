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
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email; // nullable allowed

    @Column(unique = true)
    private String phone; // nullable allowed

    private String firstName;
    private String lastName;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AccountStatus accountStatus;

    @Column(nullable = false)
    private Boolean emailVerified = false;

    @Column(nullable = false)
    private Boolean phoneVerified = false;

    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();
}
