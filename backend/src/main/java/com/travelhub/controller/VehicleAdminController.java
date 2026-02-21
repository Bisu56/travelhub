package com.travelhub.controller;

import com.travelhub.Dtos.*;
import com.travelhub.entity.User;
import com.travelhub.service.UserService;
import com.travelhub.service.VehicleService;
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
public class VehicleAdminController {

    private final VehicleService vehicleService;
    private final UserService userService;

    @GetMapping("/vehicles/pending")
    public ResponseEntity<List<VehicleResponseDTO>> listPendingVehicles() {
        return ResponseEntity.ok(vehicleService.listPendingVehicles());
    }

    @PostMapping("/vehicles/{vehicleId}/approve")
    public ResponseEntity<VehicleResponseDTO> approveVehicle(
            @PathVariable Long vehicleId,
            @RequestHeader(value = "X-Forwarded-For", required = false) String ip,
            Authentication auth
    ) {
        User admin = userService.getCurrentUser(auth);
        return ResponseEntity.ok(vehicleService.approveVehicle(admin, vehicleId, ip));
    }

    @PostMapping("/vehicles/{vehicleId}/reject")
    public ResponseEntity<VehicleResponseDTO> rejectVehicle(
            @PathVariable Long vehicleId,
            @RequestBody RejectionRequest request,
            @RequestHeader(value = "X-Forwarded-For", required = false) String ip,
            Authentication auth
    ) {
        User admin = userService.getCurrentUser(auth);
        return ResponseEntity.ok(vehicleService.rejectVehicle(admin, vehicleId, request.getReason(), ip));
    }

    @PostMapping("/vehicles/{vehicleId}/publish")
    public ResponseEntity<VehicleResponseDTO> publishVehicle(
            @PathVariable Long vehicleId,
            @RequestHeader(value = "X-Forwarded-For", required = false) String ip,
            Authentication auth
    ) {
        User admin = userService.getCurrentUser(auth);
        return ResponseEntity.ok(vehicleService.approveVehicle(admin, vehicleId, ip));
    }

    @PostMapping("/vehicles/{vehicleId}/delete")
    public ResponseEntity<Void> deleteVehicle(
            @PathVariable Long vehicleId,
            @RequestHeader(value = "X-Forwarded-For", required = false) String ip,
            Authentication auth
    ) {
        User admin = userService.getCurrentUser(auth);
        vehicleService.deleteVehicle(admin, vehicleId, ip);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<VehicleBookingResponseDTO>> allBookings() {
        return ResponseEntity.ok(vehicleService.getAllBookings());
    }

    @PostMapping("/bookings/{bookingId}/confirm")
    public ResponseEntity<Void> confirmBooking(@PathVariable Long bookingId, Authentication auth) {
        User admin = userService.getCurrentUser(auth);
        vehicleService.confirmBooking(admin, bookingId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/bookings/{bookingId}/complete")
    public ResponseEntity<Void> completeBooking(@PathVariable Long bookingId, Authentication auth) {
        User admin = userService.getCurrentUser(auth);
        vehicleService.completeBooking(admin, bookingId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/bookings/{bookingId}/reject")
    public ResponseEntity<Void> rejectBooking(
            @PathVariable Long bookingId,
            @RequestBody BookingRejectionRequest request,
            Authentication auth
    ) {
        User admin = userService.getCurrentUser(auth);
        vehicleService.rejectBooking(admin, bookingId, request.getReason());
        return ResponseEntity.ok().build();
    }
}