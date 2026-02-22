package com.travelhub.Dtos;

import com.travelhub.entity.enums.Role;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
@Getter
@Setter
@Data
@Builder
public class UserAdminDTO {
    private Long id;
    private String email;
    private String phone;
    private String firstName;
    private String lastName;
    private Role role;
    private Boolean emailVerified;
    private Boolean phoneVerified;
    private Boolean active;
    private Instant createdAt;
}