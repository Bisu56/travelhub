package com.travelhub.controller;

import com.travelhub.Dtos.DestinationResponseDTO;
import com.travelhub.Mapper.DestinationMapper;
import com.travelhub.entity.DestinationBooking;
import com.travelhub.entity.DestinationPackage;
import com.travelhub.entity.Review;
import com.travelhub.entity.User;
import com.travelhub.entity.enums.DestinationType;
import com.travelhub.service.DestinationBookingService;
import com.travelhub.service.DestinationSearchService;
import com.travelhub.service.ReviewService;
import com.travelhub.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

import static java.util.Arrays.stream;

@RestController
@RequestMapping("/api/user/destinations")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class DestinationUserController {

    private final DestinationSearchService searchService;
    private final DestinationBookingService bookingService;
    private final ReviewService reviewService;
    private final UserService userService;

    public record BookingRequest(
            @NotNull @Min(1) Integer people,
            @NotNull @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate travelDate
    ) {}

    public record ReviewRequest(
            @NotNull @Min(1) @Max(5) Integer rating,
            @NotBlank String comment
    ) {}

    @GetMapping("/search")
    public ResponseEntity<List<DestinationResponseDTO>> search(
            @RequestParam(required = false) String country,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) DestinationType type,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate travelDate,
            @RequestParam(required = false) Boolean includesHotel,
            @RequestParam(required = false) Boolean includesFlight,
            @RequestParam(required = false) Boolean includesFood,
            @RequestParam(required = false) Boolean includesTransport
    ) {

        List<DestinationResponseDTO> results =
                searchService.search(
                                country, city, type, minPrice, maxPrice, travelDate,
                                includesHotel, includesFlight, includesFood, includesTransport
                        )
                        .stream()
                        .map(DestinationMapper::toDTO)
                        .toList();

        return ResponseEntity.ok(results);
    }

    @PostMapping("/{packageId}/book")
    public ResponseEntity<DestinationBooking> book(
            @PathVariable Long packageId,
            @Valid @RequestBody BookingRequest request,
            Authentication auth
    ) {
        User user = userService.getCurrentUser(auth);
        DestinationBooking booking = bookingService.book(packageId, request.people(), request.travelDate(), user);
        return ResponseEntity.ok(booking);
    }

    @PostMapping("/booking/{bookingId}/cancel")
    public ResponseEntity<?> cancel(@PathVariable Long bookingId, Authentication auth) {
        User user = userService.getCurrentUser(auth);
        bookingService.cancel(bookingId, user);
        return ResponseEntity.ok().body("{\"message\":\"Booking cancelled\"}");
    }
    @GetMapping("/bookings")
    public ResponseEntity<List<DestinationBooking>> myBookings(Authentication auth) {
        User user = userService.getCurrentUser(auth);
        return ResponseEntity.ok(bookingService.getUserBookings(user));
    }

    @PostMapping("/{packageId}/review")
    public ResponseEntity<Review> review(
            @PathVariable Long packageId,
            @Valid @RequestBody ReviewRequest request,
            Authentication auth
    ) {
        User user = userService.getCurrentUser(auth);
        Review r = reviewService.addReview(packageId, request.rating(), request.comment(), user);
        return ResponseEntity.ok(r);
    }

    @GetMapping("/{packageId}/reviews")
    public ResponseEntity<List<Review>> getReviews(@PathVariable Long packageId) {
        return ResponseEntity.ok(reviewService.getReviews(packageId));
    }
}