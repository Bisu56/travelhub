package com.travelhub.controller;

import com.travelhub.Dtos.*;
import com.travelhub.entity.User;
import com.travelhub.entity.enums.DestinationType;
import com.travelhub.service.DestinationService;
import com.travelhub.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/user/destinations")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class DestinationUserController {

    private final DestinationService destinationService;
    private final UserService userService;

    // 1️⃣ Search packages
    @GetMapping("/search")
    public ResponseEntity<List<DestinationResponseDTO>> search(
            @RequestParam(required = false) String country,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) DestinationType type,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) LocalDate travelDate,
            @RequestParam(required = false) Boolean includesHotel,
            @RequestParam(required = false) Boolean includesFlight,
            @RequestParam(required = false) Boolean includesFood,
            @RequestParam(required = false) Boolean includesTransport
    ) {
        return ResponseEntity.ok(destinationService.searchPackages(
                country, city, type, minPrice, maxPrice, travelDate,
                includesHotel, includesFlight, includesFood, includesTransport));
    }

    // 2️⃣ Book package
    @PostMapping("/{packageId}/book")
    public ResponseEntity<DestinationBookingResponseDTO> book(
            @PathVariable Long packageId,
            @RequestBody BookingRequest request,
            Authentication auth
    ) {
        User user = userService.getCurrentUser(auth);
        return ResponseEntity.ok(destinationService.bookPackage(user, packageId,
                request.getPeople(), request.getTravelDate()));
    }

    // 3️⃣ Cancel booking
    @PostMapping("/booking/{bookingId}/cancel")
    public ResponseEntity<Void> cancelBooking(@PathVariable Long bookingId,
                                              Authentication auth) {
        User user = userService.getCurrentUser(auth);
        destinationService.cancelBooking(user, bookingId);
        return ResponseEntity.ok().build();
    }

    // 4️⃣ Get previous bookings
    @GetMapping("/bookings")
    public ResponseEntity<List<DestinationBookingResponseDTO>> myBookings(Authentication auth) {
        User user = userService.getCurrentUser(auth);
        return ResponseEntity.ok(destinationService.getUserBookings(user));
    }

    // 5️⃣ Add review
    @PostMapping("/{packageId}/review")
    public ResponseEntity<ReviewResponseDTO> review(
            @PathVariable Long packageId,
            @RequestBody ReviewRequest request,
            Authentication auth
    ) {
        User user = userService.getCurrentUser(auth);
        return ResponseEntity.ok(destinationService.addReview(user, packageId,
                request.getRating(), request.getComment()));
    }

    // 6️⃣ Get reviews for a package
    @GetMapping("/{packageId}/reviews")
    public ResponseEntity<List<ReviewResponseDTO>> getReviews(@PathVariable Long packageId) {
        return ResponseEntity.ok(destinationService.getReviewsForPackage(packageId));
    }
}