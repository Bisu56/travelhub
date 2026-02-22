package com.travelhub.controller;
import com.travelhub.Dtos.AgentAdminDTO;
import com.travelhub.Dtos.UserAdminDTO;
import com.travelhub.entity.AgentProfile;
import com.travelhub.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
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


    @GetMapping("/agents/dto")
    public ResponseEntity<List<AgentAdminDTO>> getAllAgentsDTO() {
        return ResponseEntity.ok(adminService.getAllAgentsDTO());
    }

    @GetMapping("/users/dto")
    public ResponseEntity<List<UserAdminDTO>> getAllUsersDTO() {
        return ResponseEntity.ok(adminService.getAllUsersDTO());
    }

    @DeleteMapping("/agents/{agentId}")
    public ResponseEntity<String> deleteAgent(@PathVariable Long agentId) {
        adminService.deleteAgent(agentId);
        return ResponseEntity.ok("Agent deleted successfully");
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
        adminService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully");
    }
}