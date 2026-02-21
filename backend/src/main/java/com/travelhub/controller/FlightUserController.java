package com.travelhub.controller;

import com.travelhub.Dtos.*;
import com.travelhub.entity.User;
import com.travelhub.entity.enums.DestinationType;
import com.travelhub.service.FlightService;
import com.travelhub.service.UserService;
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
@RequestMapping(value = "/api/user/flights", produces = "application/json")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class FlightUserController {

    private final FlightService flightService;
    private final UserService userService;

    @GetMapping("/search")
    public ResponseEntity<List<FlightResponseDTO>> searchFlights(
            @RequestParam(required = false) String departureCity,
            @RequestParam(required = false) String arrivalCity,
            @RequestParam(required = false) DestinationType type,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate departureDate,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice) {

        return ResponseEntity.ok(
                flightService.searchFlights(
                        departureCity,
                        arrivalCity,
                        type,
                        departureDate,
                        minPrice,
                        maxPrice
                )
        );
    }

    @PostMapping(value = "/{flightId}/book", consumes = "application/json")
    public ResponseEntity<FlightBookingResponseDTO> bookFlight(
            @PathVariable Long flightId,
            @Valid @RequestBody FlightBookingRequest request,
            Authentication auth) {

        User user = userService.getCurrentUser(auth);

        return ResponseEntity.ok(
                flightService.bookFlight(
                        user,
                        flightId,
                        request.getPassengers(),
                        request.getFlightClass()
                )
        );
    }

    @PostMapping("/booking/{bookingId}/cancel")
    public ResponseEntity<Void> cancelBooking(
            @PathVariable Long bookingId,
            Authentication auth) {

        User user = userService.getCurrentUser(auth);
        flightService.cancelBooking(user, bookingId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<FlightBookingResponseDTO>> myBookings(
            Authentication auth) {

        User user = userService.getCurrentUser(auth);
        return ResponseEntity.ok(
                flightService.getUserBookings(user)
        );
    }

    @PostMapping("/{flightId}/review")
    public ResponseEntity<ReviewResponseDTO> addReview(
            @PathVariable Long flightId,
            @Valid @RequestBody ReviewRequest request,
            Authentication auth) {

        User user = userService.getCurrentUser(auth);

        return ResponseEntity.ok(
                flightService.addReview(
                        user,
                        flightId,
                        request.getRating(),
                        request.getComment()
                )
        );
    }

    @GetMapping("/{flightId}/reviews")
    public ResponseEntity<List<ReviewResponseDTO>> getReviews(
            @PathVariable Long flightId) {

        return ResponseEntity.ok(
                flightService.getReviews(flightId)
        );
    }
}