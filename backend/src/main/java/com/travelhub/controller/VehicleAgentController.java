package com.travelhub.controller;

import com.travelhub.Dtos.*;
import com.travelhub.entity.User;
import com.travelhub.service.UserService;
import com.travelhub.service.VehicleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/agent/vehicles", produces = "application/json")
@RequiredArgsConstructor
@PreAuthorize("hasRole('AGENT')")
public class VehicleAgentController {

    private final VehicleService vehicleService;
    private final UserService userService;

    @PostMapping("/create")
    public ResponseEntity<VehicleResponseDTO> createVehicle(
            @Valid @RequestBody VehicleRequestDTO dto,
            Authentication auth
    ) {
        User agent = userService.getCurrentUser(auth);
        return ResponseEntity.ok(vehicleService.createVehicle(agent, dto));
    }

    @PutMapping("/{vehicleId}")
    public ResponseEntity<VehicleResponseDTO> updateVehicle(
            @PathVariable Long vehicleId,
            @Valid @RequestBody VehicleRequestDTO dto,
            Authentication auth
    ) {
        User agent = userService.getCurrentUser(auth);
        return ResponseEntity.ok(vehicleService.updateVehicle(agent, vehicleId, dto));
    }

    @PostMapping("/{vehicleId}/submit")
    public ResponseEntity<VehicleResponseDTO> submitVehicle(
            @PathVariable Long vehicleId,
            Authentication auth
    ) {
        User agent = userService.getCurrentUser(auth);
        return ResponseEntity.ok(vehicleService.submitVehicle(agent, vehicleId));
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<VehicleBookingResponseDTO>> myVehicleBookings(Authentication auth) {
        User agent = userService.getCurrentUser(auth);
        return ResponseEntity.ok(vehicleService.getBookingsForAgent(agent));
    }

    @PostMapping("/bookings/{bookingId}/confirm")
    public ResponseEntity<Void> confirmBooking(
            @PathVariable Long bookingId,
            Authentication auth
    ) {
        User agent = userService.getCurrentUser(auth);
        vehicleService.confirmBooking(agent, bookingId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/bookings/{bookingId}/complete")
    public ResponseEntity<Void> completeBooking(
            @PathVariable Long bookingId,
            Authentication auth
    ) {
        User agent = userService.getCurrentUser(auth);
        vehicleService.completeBooking(agent, bookingId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/bookings/{bookingId}/reject")
    public ResponseEntity<Void> rejectBooking(
            @PathVariable Long bookingId,
            @RequestBody BookingRejectionRequest request,
            Authentication auth
    ) {
        User agent = userService.getCurrentUser(auth);
        vehicleService.rejectBooking(agent, bookingId, request.getReason());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/reviews")
    public ResponseEntity<List<ReviewResponseDTO>> myVehicleReviews(Authentication auth) {
        User agent = userService.getCurrentUser(auth);
        List<VehicleResponseDTO> vehicles = vehicleService.getVehiclesByAgent(agent);

        List<ReviewResponseDTO> reviews = vehicles.stream()
                .flatMap(v -> vehicleService.getReviews(v.getId()).stream())
                .toList();

        return ResponseEntity.ok(reviews);
    }
}