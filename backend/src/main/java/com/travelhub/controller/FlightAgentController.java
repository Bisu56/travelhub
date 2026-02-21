package com.travelhub.controller;

import com.travelhub.Dtos.FlightBookingResponseDTO;
import com.travelhub.Dtos.FlightRequestDTO;
import com.travelhub.Dtos.FlightResponseDTO;
import com.travelhub.Dtos.ReviewResponseDTO;
import com.travelhub.entity.User;
import com.travelhub.service.FlightService;
import com.travelhub.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agent/flights")
@RequiredArgsConstructor
@PreAuthorize("hasRole('AGENT')")
public class FlightAgentController {

    private final FlightService flightService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<FlightResponseDTO> createFlight(
            @RequestBody FlightRequestDTO dto,
            Authentication authentication) {

        User agent = userService.getCurrentUser(authentication);
        return ResponseEntity.ok(flightService.createFlight(agent, dto));
    }

    @PutMapping("/{flightId}")
    public ResponseEntity<FlightResponseDTO> updateFlight(
            @PathVariable Long flightId,
            @RequestBody FlightRequestDTO dto,
            Authentication authentication) {

        User agent = userService.getCurrentUser(authentication);
        return ResponseEntity.ok(flightService.updateFlight(agent, flightId, dto));
    }

    @PostMapping("/{flightId}/submit")
    public ResponseEntity<FlightResponseDTO> submitFlight(
            @PathVariable Long flightId,
            Authentication authentication) {

        User agent = userService.getCurrentUser(authentication);
        return ResponseEntity.ok(flightService.submitFlight(agent, flightId));
    }

    @DeleteMapping("/{flightId}")
    public ResponseEntity<Void> deleteFlight(
            @PathVariable Long flightId,
            Authentication authentication) {

        User agent = userService.getCurrentUser(authentication);
        flightService.deleteFlight(agent, flightId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/booking/{bookingId}/confirm")
    public ResponseEntity<Void> confirmBooking(
            @PathVariable Long bookingId,
            Authentication authentication) {

        User agent = userService.getCurrentUser(authentication);
        flightService.confirmBooking(agent, bookingId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/booking/{bookingId}/complete")
    public ResponseEntity<Void> completeBooking(
            @PathVariable Long bookingId,
            Authentication authentication) {

        User agent = userService.getCurrentUser(authentication);
        flightService.completeBooking(agent, bookingId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<FlightBookingResponseDTO>> getAgentBookings(
            Authentication authentication) {

        User agent = userService.getCurrentUser(authentication);
        return ResponseEntity.ok(flightService.getBookingsForAgent(agent));
    }

    @GetMapping("/reviews")
    public ResponseEntity<List<ReviewResponseDTO>> getFlightReviews(
            Authentication authentication) {

        User agent = userService.getCurrentUser(authentication);
        return ResponseEntity.ok(flightService.getReviewsForFlight(agent));
    }
}