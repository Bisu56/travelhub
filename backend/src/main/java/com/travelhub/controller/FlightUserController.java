package com.travelhub.controller;

import com.travelhub.Dtos.*;
import com.travelhub.entity.User;
import com.travelhub.service.FlightService;
import com.travelhub.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/user/flights")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class FlightUserController {

    private final FlightService flightService;
    private final UserService userService;

    @GetMapping("/search")
    public ResponseEntity<List<FlightResponseDTO>> searchFlights(
            @RequestParam String origin,
            @RequestParam String destination,
            @RequestParam LocalDateTime start,
            @RequestParam LocalDateTime end) {

        return ResponseEntity.ok(
                flightService.searchFlights(origin, destination, start, end)
        );
    }

    @PostMapping("/{flightId}/book")
    public ResponseEntity<FlightBookingResponseDTO> bookFlight(
            @PathVariable Long flightId,
            @RequestBody BookingRequest request,
            Authentication authentication) {

        User user = userService.getCurrentUser(authentication);
        return ResponseEntity.ok(
                flightService.bookFlight(user, flightId, request.getPeople())
        );
    }

    @PostMapping("/booking/{bookingId}/cancel")
    public ResponseEntity<Void> cancelBooking(
            @PathVariable Long bookingId,
            Authentication authentication) {

        User user = userService.getCurrentUser(authentication);
        flightService.cancelBooking(user, bookingId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<FlightBookingResponseDTO>> getUserBookings(
            Authentication authentication) {

        User user = userService.getCurrentUser(authentication);
        return ResponseEntity.ok(flightService.getUserBookings(user));
    }

    @PostMapping("/{flightId}/review")
    public ResponseEntity<ReviewResponseDTO> reviewFlight(
            @PathVariable Long flightId,
            @RequestBody ReviewRequest request,
            Authentication authentication) {

        User user = userService.getCurrentUser(authentication);
        return ResponseEntity.ok(
                flightService.addReview(user, flightId, request)
        );
    }
}