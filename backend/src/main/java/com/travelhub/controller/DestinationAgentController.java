package com.travelhub.controller;

import com.travelhub.Dtos.DestinationRequestDTO;
import com.travelhub.Dtos.DestinationResponseDTO;
import com.travelhub.Mapper.DestinationMapper;
import com.travelhub.entity.User;
import com.travelhub.service.DestinationAdminService;
import com.travelhub.service.DestinationAgentService;
import com.travelhub.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/agent/destinations")
@RequiredArgsConstructor
public class DestinationAgentController {

    private final DestinationAgentService agentService;
    private final DestinationAdminService adminService; // for booking completion
    private final UserService userService;

    @PostMapping
    public ResponseEntity<DestinationResponseDTO> create(
            @RequestBody DestinationRequestDTO request,
            Authentication auth
    ) {
        User agent = userService.getCurrentUser(auth);
        return ResponseEntity.ok(
                DestinationMapper.toDTO(agentService.create(request, agent))
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<DestinationResponseDTO> update(
            @PathVariable Long id,
            @RequestBody DestinationRequestDTO request,
            Authentication auth
    ) {
        User agent = userService.getCurrentUser(auth);
        return ResponseEntity.ok(
                DestinationMapper.toDTO(agentService.update(id, request, agent))
        );
    }

    @PostMapping("/{id}/submit")
    public ResponseEntity<DestinationResponseDTO> submit(
            @PathVariable Long id,
            Authentication auth
    ) {
        User agent = userService.getCurrentUser(auth);
        return ResponseEntity.ok(
                DestinationMapper.toDTO(agentService.submit(id, agent))
        );
    }

    @GetMapping("/my-packages")
    public ResponseEntity<List<DestinationResponseDTO>> myPackages(Authentication auth) {
        User agent = userService.getCurrentUser(auth);
        List<DestinationResponseDTO> list = agentService.getAgentPackages(agent)
                .stream()
                .map(DestinationMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @PostMapping("/booking/{bookingId}/complete")
    public ResponseEntity<String> completeBooking(
            @PathVariable Long bookingId,
            Authentication auth
    ) {
        User agent = userService.getCurrentUser(auth);
        adminService.markBookingCompleted(bookingId, agent);
        return ResponseEntity.ok("Booking marked as COMPLETED and user notified.");
    }
}
