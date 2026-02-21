package com.travelhub.controller;

import com.travelhub.Dtos.FlightBookingResponseDTO;
import com.travelhub.Dtos.FlightResponseDTO;
import com.travelhub.Dtos.RejectionRequest;
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
@RequestMapping("/api/admin/flights")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class FlightAdminController {

    private final FlightService flightService;
    private final UserService userService;

    @GetMapping("/pending")
    public ResponseEntity<List<FlightResponseDTO>> listPendingFlights() {
        return ResponseEntity.ok(flightService.listPendingFlights());
    }

    @PostMapping("/{flightId}/approve")
    public ResponseEntity<FlightResponseDTO> approveFlight(
            @PathVariable Long flightId,
            @RequestHeader(value = "X-Forwarded-For", required = false) String ip,
            Authentication authentication) {

        User admin = userService.getCurrentUser(authentication);
        return ResponseEntity.ok(flightService.approveFlight(admin, flightId, ip));
    }

    @PostMapping("/{flightId}/reject")
    public ResponseEntity<FlightResponseDTO> rejectFlight(
            @PathVariable Long flightId,
            @RequestBody RejectionRequest request,
            @RequestHeader(value = "X-Forwarded-For", required = false) String ip,
            Authentication authentication) {

        User admin = userService.getCurrentUser(authentication);
        return ResponseEntity.ok(
                flightService.rejectFlight(admin, flightId, request.getReason(), ip)
        );
    }

    @PostMapping("/{flightId}/publish")
    public ResponseEntity<FlightResponseDTO> publishFlight(
            @PathVariable Long flightId,
            @RequestHeader(value = "X-Forwarded-For", required = false) String ip,
            Authentication authentication) {

        User admin = userService.getCurrentUser(authentication);
        return ResponseEntity.ok(flightService.publishFlight(admin, flightId, ip));
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<FlightBookingResponseDTO>> getAllBookings(
            Authentication authentication) {

        userService.getCurrentUser(authentication);
        return ResponseEntity.ok(flightService.getAllBookings());
    }
}