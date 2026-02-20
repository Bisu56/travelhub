package com.travelhub.Dtos;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReviewResponseDTO {

    private Long id;
    private Long packageId;
    private Long userId;
    private String userEmail;
    private Integer rating;
    private String comment;
}