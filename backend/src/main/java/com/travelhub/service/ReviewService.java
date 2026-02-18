package com.travelhub.service;
import com.travelhub.entity.DestinationPackage;
import com.travelhub.entity.Review;
import com.travelhub.entity.User;
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
    private final DestinationPackageRepository packageRepository;

    public Review addReview(Long packageId,
                            Integer rating,
                            String comment,
                            User user) {

        Review review = Review.builder()
                .user(user)
                .referenceId(packageId)
                .referenceType("DESTINATION")
                .rating(rating)
                .comment(comment)
                .build();

        reviewRepository.save(review);

        recalculateRating(packageId);

        return review;
    }

    private void recalculateRating(Long packageId) {

        List<Review> reviews =
                reviewRepository.findByReferenceIdAndReferenceType(packageId, "DESTINATION");

        double avg = reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0);

        DestinationPackage pkg =
                packageRepository.findById(packageId).orElseThrow();

        pkg.setRatingAverage(avg);
        pkg.setTotalReviews((long) reviews.size());

        packageRepository.save(pkg);
    }
}

