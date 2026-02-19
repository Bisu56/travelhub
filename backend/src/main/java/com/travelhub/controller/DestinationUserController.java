package com.travelhub.controller;

import com.travelhub.entity.DestinationBooking;
import com.travelhub.entity.DestinationPackage;
import com.travelhub.entity.Review;
import com.travelhub.entity.User;
import com.travelhub.service.DestinationBookingService;
import com.travelhub.service.DestinationSearchService;
import com.travelhub.service.ReviewService;
import com.travelhub.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/user/destinations")
@RequiredArgsConstructor
public class DestinationUserController {

    private final DestinationSearchService searchService;
    private final DestinationBookingService bookingService;
    private final ReviewService reviewService;
    private final UserService userService;

    @GetMapping("/search")
    public ResponseEntity<List<DestinationPackage>> search(
            @RequestParam(required = false) String country,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice
    ) {
        return ResponseEntity.ok(searchService.search(country, city, minPrice, maxPrice));
    }

    @PostMapping("/{packageId}/book")
    public ResponseEntity<DestinationBooking> book(@PathVariable Long packageId,
                                                   @RequestParam Integer people,
                                                   @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate travelDate,
                                                   Authentication auth) {
        User user = userService.getCurrentUser(auth);
        return ResponseEntity.ok(bookingService.book(packageId, people, travelDate, user));
    }

    @PostMapping("/booking/{bookingId}/cancel")
    public ResponseEntity<String> cancel(@PathVariable Long bookingId,
                                         Authentication auth) {
        User user = userService.getCurrentUser(auth);
        bookingService.cancel(bookingId, user);
        return ResponseEntity.ok("Booking cancelled");
    }

    @PostMapping("/{packageId}/review")
    public ResponseEntity<Review> review(@PathVariable Long packageId,
                                         @RequestParam Integer rating,
                                         @RequestParam String comment,
                                         Authentication auth) {
        User user = userService.getCurrentUser(auth);
        return ResponseEntity.ok(reviewService.addReview(packageId, rating, comment, user));
    }

    @GetMapping("/{packageId}/reviews")
    public ResponseEntity<List<Review>> getReviews(@PathVariable Long packageId) {
        return ResponseEntity.ok(reviewService.getReviews(packageId));
    }
}
