package com.travelhub.Dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class AuthResponse {
    private String accessToken;
    private String refreshToken;
}
