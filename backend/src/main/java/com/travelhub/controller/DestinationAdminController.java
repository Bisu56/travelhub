package com.travelhub.controller;

import com.travelhub.Dtos.*;
import com.travelhub.entity.User;
import com.travelhub.service.DestinationService;
import com.travelhub.service.UserService;
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

    private final DestinationService destinationService;
    private final UserService userService;

    @GetMapping("/pending")
    public ResponseEntity<List<DestinationResponseDTO>> listPending() {
        return ResponseEntity.ok(destinationService.listPendingPackages());
    }

    @PostMapping("/{packageId}/approve")
    public ResponseEntity<DestinationResponseDTO> approve(@PathVariable Long packageId,
                                                          @RequestHeader(value = "X-Forwarded-For", required = false) String ip,
                                                          Authentication auth) {
        User admin = userService.getCurrentUser(auth);
        return ResponseEntity.ok(destinationService.approvePackage(admin, packageId, ip));
    }

    @PostMapping("/{packageId}/reject")
    public ResponseEntity<DestinationResponseDTO> reject(@PathVariable Long packageId,
                                                         @RequestBody RejectionRequest request,
                                                         @RequestHeader(value = "X-Forwarded-For", required = false) String ip,
                                                         Authentication auth) {
        User admin = userService.getCurrentUser(auth);
        return ResponseEntity.ok(destinationService.rejectPackage(admin, packageId, request.getReason(), ip));
    }

    @PostMapping("/{packageId}/publish")
    public ResponseEntity<DestinationResponseDTO> publish(@PathVariable Long packageId,
                                                          @RequestHeader(value = "X-Forwarded-For", required = false) String ip,
                                                          Authentication auth) {
        User admin = userService.getCurrentUser(auth);
        return ResponseEntity.ok(destinationService.publishPackage(admin, packageId, ip));
    }

    // Admin can view all bookings
    @GetMapping("/bookings")
    public ResponseEntity<List<DestinationBookingResponseDTO>> allBookings(Authentication auth) {
        User admin = userService.getCurrentUser(auth);
        return ResponseEntity.ok(destinationService.getAllBookings());
    }
}