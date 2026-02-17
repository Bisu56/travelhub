package com.travelhub.Dtos;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    @Email
    private String email;

    private String phone;

    @NotBlank
    @Size(min = 8)
    private String password;
}
