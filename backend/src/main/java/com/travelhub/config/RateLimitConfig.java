package com.travelhub.config;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;
@Configuration
public class RateLimitConfig {

    @Bean
    public Bucket emailOtpBucket() {
        Refill refill = Refill.greedy(5, Duration.ofMinutes(1));
        Bandwidth limit = Bandwidth.classic(5, refill);
        return Bucket.builder().addLimit(limit).build();
    }

    @Bean
    public Bucket phoneOtpBucket() {
        Refill refill = Refill.greedy(2, Duration.ofMinutes(1));
        Bandwidth limit = Bandwidth.classic(3, refill);
        return Bucket.builder().addLimit(limit).build();
    }
}

