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

import java.util.List;

@RestController
@RequestMapping(value = "/api/admin", produces = "application/json")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class FlightAdminController {

    private final FlightService flightService;
    private final UserService userService;

    @GetMapping("/flights/pending")
    public ResponseEntity<List<FlightResponseDTO>> listPendingFlights() {
        return ResponseEntity.ok(flightService.listPendingFlights());
    }

    @PostMapping("/flights/{flightId}/approve")
    public ResponseEntity<FlightResponseDTO> approveFlight(
            @PathVariable Long flightId,
            @RequestHeader(value = "X-Forwarded-For", required = false) String ip,
            Authentication auth) {

        User admin = userService.getCurrentUser(auth);
        return ResponseEntity.ok(flightService.approveFlight(admin, flightId, ip));
    }

    @PostMapping("/flights/{flightId}/reject")
    public ResponseEntity<FlightResponseDTO> rejectFlight(
            @PathVariable Long flightId,
            @RequestBody RejectionRequest request,
            @RequestHeader(value = "X-Forwarded-For", required = false) String ip,
            Authentication auth) {

        User admin = userService.getCurrentUser(auth);
        return ResponseEntity.ok(flightService.rejectFlight(admin, flightId, request.getReason(), ip));
    }

    @PostMapping("/flights/{flightId}/publish")
    public ResponseEntity<FlightResponseDTO> publishFlight(
            @PathVariable Long flightId,
            @RequestHeader(value = "X-Forwarded-For", required = false) String ip,
            Authentication auth) {

        User admin = userService.getCurrentUser(auth);
        return ResponseEntity.ok(flightService.publishFlight(admin, flightId, ip));
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<FlightBookingResponseDTO>> allBookings() {
        return ResponseEntity.ok(flightService.getAllBookings());
    }

    @PostMapping("/bookings/{bookingId}/confirm")
    public ResponseEntity<Void> confirmBooking(@PathVariable Long bookingId, Authentication auth) {
        User admin = userService.getCurrentUser(auth);
        flightService.confirmBooking(admin, bookingId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/bookings/{bookingId}/complete")
    public ResponseEntity<Void> completeBooking(@PathVariable Long bookingId, Authentication auth) {
        User admin = userService.getCurrentUser(auth);
        flightService.completeBooking(admin, bookingId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/bookings/{bookingId}/reject")
    public ResponseEntity<Void> rejectBooking(
            @PathVariable Long bookingId,
            @RequestBody BookingRejectionRequest request,
            Authentication auth) {

        User admin = userService.getCurrentUser(auth);
        flightService.rejectBooking(admin, bookingId, request.getReason());
        return ResponseEntity.ok().build();
    }
}