package com.travelhub.controller;
import com.travelhub.entity.AgentProfile;
import com.travelhub.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/agents/pending")
    public ResponseEntity<List<AgentProfile>> listPendingAgents() {
        return ResponseEntity.ok(adminService.listPendingAgents());
    }

    @PostMapping("/agents/{agentId}/approve")
    public ResponseEntity<String> approveAgent(@PathVariable Long agentId) {
        adminService.approveAgent(agentId);
        return ResponseEntity.ok("Agent approved successfully");
    }

    @PostMapping("/agents/{agentId}/reject")
    public ResponseEntity<String> rejectAgent(@PathVariable Long agentId) {
        adminService.rejectAgent(agentId);
        return ResponseEntity.ok("Agent rejected successfully");
    }
}
