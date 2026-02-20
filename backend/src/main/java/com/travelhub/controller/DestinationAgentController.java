package com.travelhub.controller;

import com.travelhub.Dtos.DestinationRequestDTO;
import com.travelhub.Dtos.DestinationResponseDTO;
import com.travelhub.Mapper.DestinationMapper;
import com.travelhub.entity.User;
import com.travelhub.repository.DestinationBookingRepository;
import com.travelhub.service.DestinationAdminService;
import com.travelhub.service.DestinationAgentService;
import com.travelhub.service.DestinationBookingService;
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
    private final DestinationBookingService bookingService; // For marking booking complete
    private final UserService userService;

    @PostMapping
    public ResponseEntity<DestinationResponseDTO> create(
            @Valid @RequestBody DestinationRequestDTO request,
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
            @Valid @RequestBody DestinationRequestDTO request,
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
                .toList();
        return ResponseEntity.ok(list);
    }
    @PostMapping("/booking/{bookingId}/confirm")
    public ResponseEntity<?> confirmBooking(@PathVariable Long bookingId,
                                            Authentication auth) {
        User agent = userService.getCurrentUser(auth);
        bookingService.confirmBooking(bookingId, agent);
        return ResponseEntity.ok().body("{\"message\":\"Booking confirmed\"}");
    }

    @PostMapping("/booking/{bookingId}/complete")
    public ResponseEntity<?> completeBooking(
            @PathVariable Long bookingId,
            Authentication auth
    ) {
        User agent = userService.getCurrentUser(auth);
        bookingService.completeBooking(bookingId, agent);
        return ResponseEntity.ok().body("{\"message\":\"Booking marked as COMPLETED and user notified.\"}");
    }
}
