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
    public ResponseEntity<Void> reject(@PathVariable Long packageId,
                                       @RequestBody RejectionRequest request,
                                       @RequestHeader(value = "X-Forwarded-For", required = false) String ip,
                                       Authentication auth) {
        User admin = userService.getCurrentUser(auth);
        destinationService.rejectBooking(admin, packageId, request.getReason());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{packageId}/publish")
    public ResponseEntity<DestinationResponseDTO> publish(@PathVariable Long packageId,
                                                          @RequestHeader(value = "X-Forwarded-For", required = false) String ip,
                                                          Authentication auth) {
        User admin = userService.getCurrentUser(auth);
        return ResponseEntity.ok(destinationService.publishPackage(admin, packageId, ip));
    }

    @PutMapping("/{packageId}")
    public ResponseEntity<DestinationResponseDTO> updatePackage(@PathVariable Long packageId,
                                                                @RequestBody DestinationRequestDTO dto,
                                                                Authentication auth) {
        User admin = userService.getCurrentUser(auth);
        return ResponseEntity.ok(destinationService.updatePackage(admin, packageId, dto));
    }

    @DeleteMapping("/{packageId}")
    public ResponseEntity<Void> deletePackage(@PathVariable Long packageId,
                                              Authentication auth) {
        User admin = userService.getCurrentUser(auth);
        destinationService.deletePackage(admin, packageId);
        return ResponseEntity.ok().build();
    }

    // Admin booking actions (any booking)
    @PostMapping("/booking/{bookingId}/confirm")
    public ResponseEntity<Void> confirmBooking(@PathVariable Long bookingId,
                                               Authentication auth) {
        User admin = userService.getCurrentUser(auth);
        destinationService.confirmBooking(admin, bookingId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/booking/{bookingId}/complete")
    public ResponseEntity<Void> completeBooking(@PathVariable Long bookingId,
                                                Authentication auth) {
        User admin = userService.getCurrentUser(auth);
        destinationService.completeBooking(admin, bookingId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/booking/{bookingId}/reject")
    public ResponseEntity<Void> rejectBooking(@PathVariable Long bookingId,
                                              @RequestBody RejectionRequest request,
                                              Authentication auth) {
        User admin = userService.getCurrentUser(auth);
        destinationService.rejectBooking(admin, bookingId, request.getReason());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<DestinationBookingResponseDTO>> allBookings(Authentication auth) {
        User admin = userService.getCurrentUser(auth);
        return ResponseEntity.ok(destinationService.getAllBookings());
    }

    @GetMapping("/reviews")
    public ResponseEntity<List<ReviewResponseDTO>> allReviews() {
        return ResponseEntity.ok(destinationService.getAllReviews());
    }
}