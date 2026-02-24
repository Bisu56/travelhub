package com.travelhub.Dtos.dashboard;

public record UserDashboardDTO(
        Long totalBookings,
        Long confirmedBookings,
        Double totalSpent,
        Long pendingPayments
) {}