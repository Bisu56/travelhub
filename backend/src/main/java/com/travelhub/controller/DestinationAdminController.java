package com.travelhub.controller;

import com.travelhub.Dtos.DestinationRequestDTO;
import com.travelhub.Dtos.DestinationResponseDTO;
import com.travelhub.entity.User;
import com.travelhub.service.DestinationAdminService;
import com.travelhub.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin/destinations")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class DestinationAdminController {

    private final DestinationAdminService service;
    private final UserService userService;

    public record RejectionRequest(String reason) {}

    @PutMapping("/{id}")
    public ResponseEntity<DestinationResponseDTO> edit(
            @PathVariable Long id,
            @Valid @RequestBody DestinationRequestDTO request,
            Authentication auth,
            HttpServletRequest httpRequest
    ) {
        User admin = userService.getCurrentUser(auth);
        String ip = httpRequest.getRemoteAddr();
        return ResponseEntity.ok(service.edit(id, request, admin, ip));
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<DestinationResponseDTO> approve(
            @PathVariable Long id,
            Authentication auth,
            HttpServletRequest httpRequest
    ) {
        User admin = userService.getCurrentUser(auth);
        String ip = httpRequest.getRemoteAddr();
        return ResponseEntity.ok(service.approve(id, admin, ip));
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<DestinationResponseDTO> reject(
            @PathVariable Long id,
            @RequestBody RejectionRequest request,
            Authentication auth,
            HttpServletRequest httpRequest
    ) {
        User admin = userService.getCurrentUser(auth);
        String ip = httpRequest.getRemoteAddr();
        return ResponseEntity.ok(service.reject(id, request.reason(), admin, ip));
    }

    @PostMapping("/{id}/publish")
    public ResponseEntity<DestinationResponseDTO> publish(
            @PathVariable Long id,
            Authentication auth,
            HttpServletRequest httpRequest
    ) {
        User admin = userService.getCurrentUser(auth);
        String ip = httpRequest.getRemoteAddr();
        return ResponseEntity.ok(service.publish(id, admin, ip));
    }

    @GetMapping("/pending")
    public ResponseEntity<List<DestinationResponseDTO>> pending() {
        return ResponseEntity.ok(service.listPendingPackages());
    }

    @PostMapping("/booking/{bookingId}/complete")
    public ResponseEntity<?> completeBooking(@PathVariable Long bookingId, Authentication auth) {
        User admin = userService.getCurrentUser(auth);
        service.markBookingCompleted(bookingId, admin);
        return ResponseEntity.ok().body("{\"message\":\"Booking marked as COMPLETED and user notified.\"}");
    }
}