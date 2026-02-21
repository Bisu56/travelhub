package com.travelhub.controller;

import com.travelhub.Dtos.*;
import com.travelhub.entity.User;
import com.travelhub.service.UserService;
import com.travelhub.service.VehicleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(value = "/api/user/vehicles", produces = "application/json")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class VehicleUserController {

    private final VehicleService vehicleService;
    private final UserService userService;

    @GetMapping("/search")
    public ResponseEntity<List<VehicleResponseDTO>> searchVehicles(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice
    ) {
        List<VehicleResponseDTO> vehicles = vehicleService.searchVehicles(location, startDate, endDate, minPrice, maxPrice);
        return ResponseEntity.ok(vehicles);
    }

    @PostMapping("/{vehicleId}/book")
    public ResponseEntity<VehicleBookingResponseDTO> bookVehicle(
            @PathVariable Long vehicleId,
            @Valid @RequestBody VehicleBookingRequest request,
            Authentication auth
    ) {
        User user = userService.getCurrentUser(auth);
        return ResponseEntity.ok(vehicleService.bookVehicle(user, vehicleId, request));
    }

    @PostMapping("/booking/{bookingId}/cancel")
    public ResponseEntity<Void> cancelBooking(@PathVariable Long bookingId, Authentication auth) {
        User user = userService.getCurrentUser(auth);
        vehicleService.cancelBooking(user, bookingId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<VehicleBookingResponseDTO>> myBookings(Authentication auth) {
        User user = userService.getCurrentUser(auth);
        return ResponseEntity.ok(vehicleService.getUserBookings(user));
    }

    @PostMapping("/{vehicleId}/review")
    public ResponseEntity<ReviewResponseDTO> addReview(
            @PathVariable Long vehicleId,
            @Valid @RequestBody ReviewRequest request,
            Authentication auth
    ) {
        User user = userService.getCurrentUser(auth);
        return ResponseEntity.ok(vehicleService.addReview(user, vehicleId, request.getRating(), request.getComment()));
    }

    @GetMapping("/{vehicleId}/reviews")
    public ResponseEntity<List<ReviewResponseDTO>> getReviews(@PathVariable Long vehicleId) {
        return ResponseEntity.ok(vehicleService.getReviews(vehicleId));
    }
}