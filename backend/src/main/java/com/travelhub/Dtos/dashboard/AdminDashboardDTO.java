package com.travelhub.Dtos.dashboard;

import java.util.List;

public record AdminDashboardDTO(
        Long totalUsers,
        Long totalAgents,
        Long totalBookings,
        Long confirmedBookings,
        Double totalRevenue,
        Long pendingPayments,
        Long failedPayments,
        List<TopAgentDTO> topAgents,
        List<MonthlyRevenueDTO> monthlyRevenue
) {}