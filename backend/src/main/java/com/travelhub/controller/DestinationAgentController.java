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
@RequestMapping("/api/agent/destinations")
@RequiredArgsConstructor
@PreAuthorize("hasRole('AGENT')")
public class DestinationAgentController {

    private final DestinationService destinationService;
    private final UserService userService;

    @PostMapping("/create")
    public ResponseEntity<DestinationResponseDTO> create(@RequestBody DestinationRequestDTO dto,
                                                         Authentication auth) {
        User agent = userService.getCurrentUser(auth);
        return ResponseEntity.ok(destinationService.createPackage(agent, dto));
    }

    @PutMapping("/{packageId}")
    public ResponseEntity<DestinationResponseDTO> update(@PathVariable Long packageId,
                                                         @RequestBody DestinationRequestDTO dto,
                                                         Authentication auth) {
        User agent = userService.getCurrentUser(auth);
        return ResponseEntity.ok(destinationService.updatePackage(agent, packageId, dto));
    }

    @PostMapping("/{packageId}/submit")
    public ResponseEntity<DestinationResponseDTO> submit(@PathVariable Long packageId,
                                                         Authentication auth) {
        User agent = userService.getCurrentUser(auth);
        return ResponseEntity.ok(destinationService.submitPackage(agent, packageId));
    }

    @DeleteMapping("/{packageId}")
    public ResponseEntity<Void> delete(@PathVariable Long packageId,
                                       Authentication auth) {
        User agent = userService.getCurrentUser(auth);
        destinationService.deletePackage(agent, packageId);
        return ResponseEntity.ok().build();
    }

    // Booking actions for agent's packages
    @PostMapping("/booking/{bookingId}/confirm")
    public ResponseEntity<Void> confirmBooking(@PathVariable Long bookingId,
                                               Authentication auth) {
        User agent = userService.getCurrentUser(auth);
        destinationService.confirmBooking(agent, bookingId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/booking/{bookingId}/complete")
    public ResponseEntity<Void> completeBooking(@PathVariable Long bookingId,
                                                Authentication auth) {
        User agent = userService.getCurrentUser(auth);
        destinationService.completeBooking(agent, bookingId);
        return ResponseEntity.ok().build();
    }

    // Agent can view bookings for their packages
    @GetMapping("/bookings")
    public ResponseEntity<List<DestinationBookingResponseDTO>> myPackageBookings(Authentication auth) {
        User agent = userService.getCurrentUser(auth);
        return ResponseEntity.ok(destinationService.getBookingsForAgent(agent));
    }

    // Agent can see reviews for their packages
    @GetMapping("/reviews")
    public ResponseEntity<List<ReviewResponseDTO>> myPackageReviews(Authentication auth) {
        User agent = userService.getCurrentUser(auth);
        return ResponseEntity.ok(destinationService.getReviewsForAgent(agent));
    }
}