package com.travelhub.controller;

import com.travelhub.Dtos.dashboard.AdminDashboardDTO;
import com.travelhub.Dtos.dashboard.AgentDashboardDTO;
import com.travelhub.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AdminDashboardDTO> getAdminDashboard() {
        return ResponseEntity.ok(dashboardService.getAdminDashboard());
    }

    @GetMapping("/agent/{agentId}")
    @PreAuthorize("hasRole('AGENT')")
    public ResponseEntity<AgentDashboardDTO> getAgentDashboard(@PathVariable Long agentId) {
        return ResponseEntity.ok(dashboardService.getAgentDashboard(agentId));
    }
}