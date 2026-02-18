package com.travelhub.config;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class OtpBucketManager {

    private final Map<String, Bucket> phoneBuckets = new ConcurrentHashMap<>();
    private final Map<String, Bucket> emailBuckets = new ConcurrentHashMap<>();

    private Bucket createBucket() {
        // 2 OTPs per minute per user
        Refill refill = Refill.greedy(1, Duration.ofMinutes(1));
        Bandwidth limit = Bandwidth.classic(2, refill);
        return Bucket.builder().addLimit(limit).build();
    }

    public Bucket resolvePhoneBucket(String phone) {
        return phoneBuckets.computeIfAbsent(phone, k -> createBucket());
    }

    public Bucket resolveEmailBucket(String email) {
        return emailBuckets.computeIfAbsent(email, k -> createBucket());
    }
}
