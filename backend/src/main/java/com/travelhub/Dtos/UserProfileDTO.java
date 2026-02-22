package com.travelhub.Dtos;

import com.travelhub.entity.User;
import com.travelhub.entity.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private Role role;
    private Boolean emailVerified;
    private Boolean phoneVerified;
    private Boolean active;

    // Optional fields for future expansion
    private String address;
    private String city;
    private String country;

    // Convert User entity to DTO
    public static UserProfileDTO fromUser(User user) {
        return UserProfileDTO.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole())
                .emailVerified(user.getEmailVerified())
                .phoneVerified(user.getPhoneVerified())
                .active(user.getActive())
                .address(user.getAddress())
                .city(user.getCity())
                .country(user.getCountry())
                .build();
    }

    // Update User entity from DTO
    public void updateUser(User user) {
        if (this.firstName != null) user.setFirstName(this.firstName);
        if (this.lastName != null) user.setLastName(this.lastName);
        if (this.email != null) user.setEmail(this.email);
        if (this.phone != null) user.setPhone(this.phone);
        if (this.address != null) user.setAddress(this.address);
        if (this.city != null) user.setCity(this.city);
        if (this.country != null) user.setCountry(this.country);
        // Note: Do NOT update role, active status, or verification flags here for security reasons
    }
}