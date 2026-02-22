package com.travelhub.Dtos;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@Builder
public class AgentAdminDTO {
    private Long id;
    private String licenseNumber;
    private String companyName;
    private Boolean approvalStatus;
    private Boolean deleted;
    private String email;
    private String phone;
}