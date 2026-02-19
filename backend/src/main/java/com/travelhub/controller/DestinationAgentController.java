package com.travelhub.controller;

import com.travelhub.Dtos.DestinationRequestDTO;
import com.travelhub.Dtos.DestinationResponseDTO;
import com.travelhub.entity.User;
import com.travelhub.service.DestinationAdminService;
import com.travelhub.service.DestinationAgentService;
import com.travelhub.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agent/destinations")
@RequiredArgsConstructor
@PreAuthorize("hasRole('AGENT')")
public class DestinationAgentController {

    private final DestinationAgentService agentService;
    private final DestinationAdminService adminService;
    private final UserService userService;


    @PostMapping
    public ResponseEntity<DestinationResponseDTO> create(
            @Valid @RequestBody DestinationRequestDTO request,
            Authentication auth
    ) {
        User agent = userService.getCurrentUser(auth);
        return ResponseEntity.ok(agentService.create(request, agent));
    }


    @PutMapping("/{id}")
    public ResponseEntity<DestinationResponseDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody DestinationRequestDTO request,
            Authentication auth
    ) {
        User agent = userService.getCurrentUser(auth);
        return ResponseEntity.ok(agentService.update(id, request, agent));
    }


    @PostMapping("/{id}/submit")
    public ResponseEntity<DestinationResponseDTO> submit(@PathVariable Long id, Authentication auth) {
        User agent = userService.getCurrentUser(auth);
        return ResponseEntity.ok(agentService.submit(id, agent));
    }

    @GetMapping("/my-packages")
    public ResponseEntity<List<DestinationResponseDTO>> myPackages(Authentication auth) {
        User agent = userService.getCurrentUser(auth);
        return ResponseEntity.ok(agentService.getAgentPackages(agent));
    }


    @PostMapping("/booking/{bookingId}/complete")
    public ResponseEntity<?> completeBooking(@PathVariable Long bookingId, Authentication auth) {
        User agent = userService.getCurrentUser(auth);
        adminService.markBookingCompleted(bookingId, agent);
        return ResponseEntity.ok().body("{\"message\":\"Booking marked as COMPLETED and user notified.\"}");
    }
}