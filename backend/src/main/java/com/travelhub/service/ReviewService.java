package com.travelhub.service;

import com.travelhub.entity.DestinationPackage;
import com.travelhub.entity.Review;
import com.travelhub.entity.User;
import com.travelhub.entity.enums.BookingStatus;
import com.travelhub.repository.DestinationBookingRepository;
import com.travelhub.repository.DestinationPackageRepository;
import com.travelhub.repository.ReviewRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final DestinationBookingRepository bookingRepository;
    private final DestinationPackageRepository packageRepository;

    public Review addReview(Long packageId, Integer rating, String comment, User user) {
        // Only allow completed bookings
        boolean hasCompleted = bookingRepository
                .findByUserIdAndDestinationPackageIdAndBookingStatus(
                        user.getId(), packageId, BookingStatus.COMPLETED)
                .stream().findAny().isPresent();

        if (!hasCompleted) {
            throw new RuntimeException("You can only review packages you have completed.");
        }

        Review review = Review.builder()
                .user(user)
                .referenceId(packageId)
                .referenceType("DESTINATION")
                .rating(rating)
                .comment(comment)
                .build();

        reviewRepository.save(review);
        recalcPackageRating(packageId);

        return review;
    }

    private void recalcPackageRating(Long packageId) {
        List<Review> reviews = reviewRepository.findByReferenceIdAndReferenceType(packageId, "DESTINATION");
        double avg = reviews.stream().mapToInt(Review::getRating).average().orElse(0);
        long total = reviews.size();

        DestinationPackage pkg = packageRepository.findById(packageId)
                .orElseThrow(() -> new RuntimeException("Package not found"));

        pkg.updateRating(avg, total);
        packageRepository.save(pkg);
    }

    public List<Review> getReviews(Long packageId) {
        return reviewRepository.findByReferenceIdAndReferenceType(packageId, "DESTINATION");
    }
}
