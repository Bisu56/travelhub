package com.travelhub.Dtos.dashboard;

import java.util.List;

public record AgentDashboardDTO(
        Long totalPackages,
        Long totalBookings,
        Long confirmedBookings,
        Double totalRevenue,
        Double conversionRate,
        List<MonthlyRevenueDTO> monthlyRevenue
) {}