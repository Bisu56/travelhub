package com.travelhub.Dtos.dashboard;

public record TopAgentDTO(
        Long agentId,
        String agentName,
        Double totalRevenue
) {}