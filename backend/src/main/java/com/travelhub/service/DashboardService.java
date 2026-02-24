package com.travelhub.service;

import com.travelhub.Dtos.dashboard.*;
import com.travelhub.repository.dashboard.DashboardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final DashboardRepository dashboardRepository;

    public AdminDashboardDTO getAdminDashboard() {
        Long totalUsers = dashboardRepository.getTotalUsers();
        Long totalAgents = dashboardRepository.getTotalAgents();
        Long totalBookings = dashboardRepository.getTotalVehicleBookings(); // adjust if needed
        Long confirmedBookings = dashboardRepository.getConfirmedVehicleBookings();
        Double totalRevenue = dashboardRepository.getTotalRevenue();
        Long pendingPayments = dashboardRepository.getPendingPayments();
        Long failedPayments = dashboardRepository.getFailedPayments();

        List<TopAgentDTO> topAgents = new ArrayList<>();
        topAgents.addAll(dashboardRepository.getTopVehicleAgents(PageRequest.of(0,5)));
        topAgents.addAll(dashboardRepository.getTopFlightAgents(PageRequest.of(0,5)));
        topAgents.addAll(dashboardRepository.getTopDestinationAgents(PageRequest.of(0,5)));

        List<MonthlyRevenueDTO> monthlyRevenue = dashboardRepository.getMonthlyRevenue();

        return new AdminDashboardDTO(
                totalUsers,
                totalAgents,
                totalBookings,
                confirmedBookings,
                totalRevenue,
                pendingPayments,
                failedPayments,
                topAgents,
                monthlyRevenue
        );
    }

    public AgentDashboardDTO getAgentDashboard(Long agentId) {
        List<MonthlyRevenueDTO> vehicleRevenue = dashboardRepository.getVehicleMonthlyRevenue(agentId);
        List<MonthlyRevenueDTO> flightRevenue = dashboardRepository.getFlightMonthlyRevenue(agentId);
        List<MonthlyRevenueDTO> destinationRevenue = dashboardRepository.getDestinationMonthlyRevenue(agentId);

        Long totalBookings = (long) (vehicleRevenue.size() + flightRevenue.size() + destinationRevenue.size());
        Long confirmedBookings = totalBookings; // simplified
        Double totalRevenue = vehicleRevenue.stream().mapToDouble(MonthlyRevenueDTO::revenue).sum() +
                flightRevenue.stream().mapToDouble(MonthlyRevenueDTO::revenue).sum() +
                destinationRevenue.stream().mapToDouble(MonthlyRevenueDTO::revenue).sum();

        Long totalPackages = totalBookings; // or fetch actual package count

        double conversionRate = totalBookings == 0 ? 0.0 : ((double) confirmedBookings / totalBookings) * 100;

        List<MonthlyRevenueDTO> monthlyRevenue = new ArrayList<>();
        monthlyRevenue.addAll(vehicleRevenue);
        monthlyRevenue.addAll(flightRevenue);
        monthlyRevenue.addAll(destinationRevenue);

        return new AgentDashboardDTO(
                totalPackages,
                totalBookings,
                confirmedBookings,
                totalRevenue,
                conversionRate,
                monthlyRevenue
        );
    }
}