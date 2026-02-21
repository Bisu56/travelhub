package com.travelhub.controller;

import com.travelhub.Dtos.*;
import com.travelhub.entity.User;
import com.travelhub.service.FlightService;
import com.travelhub.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/agent/flights", produces = "application/json")
@RequiredArgsConstructor
@PreAuthorize("hasRole('AGENT')")
public class FlightAgentController {

    private final FlightService flightService;
    private final UserService userService;

    @PostMapping(value = "/create", consumes = "application/json")
    public ResponseEntity<FlightResponseDTO> createFlight(
            @Valid @RequestBody FlightRequestDTO dto,
            Authentication auth) {

        User agent = userService.getCurrentUser(auth);
        return ResponseEntity.ok(flightService.createFlight(agent, dto));
    }

    @PutMapping(value = "/{flightId}", consumes = "application/json")
    public ResponseEntity<FlightResponseDTO> updateFlight(
            @PathVariable Long flightId,
            @Valid @RequestBody FlightRequestDTO dto,
            Authentication auth) {

        User agent = userService.getCurrentUser(auth);
        return ResponseEntity.ok(flightService.updateFlight(agent, flightId, dto));
    }

    @PostMapping("/{flightId}/submit")
    public ResponseEntity<FlightResponseDTO> submitFlight(
            @PathVariable Long flightId,
            Authentication auth) {

        User agent = userService.getCurrentUser(auth);
        return ResponseEntity.ok(flightService.submitFlight(agent, flightId));
    }

    @DeleteMapping("/{flightId}")
    public ResponseEntity<Void> deleteFlight(
            @PathVariable Long flightId,
            Authentication auth) {

        User agent = userService.getCurrentUser(auth);
        flightService.deleteFlight(agent, flightId);
        return ResponseEntity.ok().build();
    }

    // Booking management for agent-owned flights

    @PostMapping("/booking/{bookingId}/confirm")
    public ResponseEntity<Void> confirmBooking(
            @PathVariable Long bookingId,
            Authentication auth) {

        User agent = userService.getCurrentUser(auth);
        flightService.confirmBooking(agent, bookingId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/booking/{bookingId}/complete")
    public ResponseEntity<Void> completeBooking(
            @PathVariable Long bookingId,
            Authentication auth) {

        User agent = userService.getCurrentUser(auth);
        flightService.completeBooking(agent, bookingId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<FlightBookingResponseDTO>> myFlightBookings(
            Authentication auth) {

        User agent = userService.getCurrentUser(auth);
        return ResponseEntity.ok(flightService.getBookingsForAgent(agent));
    }

    @GetMapping("/reviews")
    public ResponseEntity<List<ReviewResponseDTO>> myFlightReviews(
            Authentication auth) {

        User agent = userService.getCurrentUser(auth);
        return ResponseEntity.ok(
                flightService.getBookingsForAgent(agent)
        );
    }
}