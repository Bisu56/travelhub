package com.travelhub.Filter;

import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Refill;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitFilter extends OncePerRequestFilter {

    private final Map<String, Bucket> cache = new ConcurrentHashMap<>();

    private Bucket resolveBucket(String key) {
        return cache.computeIfAbsent(key, k -> Bucket.builder()
                .addLimit(Bandwidth.classic(5, Refill.greedy(5, Duration.ofMinutes(1))))
                .build());
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String path = request.getRequestURI();

        boolean isOtpEndpoint = path.contains("/verify") || path.contains("/resend");
        if (isOtpEndpoint) {
            String key = request.getRemoteAddr(); // fallback IP
            Bucket bucket = resolveBucket(key);
            if (!bucket.tryConsume(1)) {
                response.setStatus(429);
                response.getWriter().write("{\"error\":\"Too many requests\"}");
                return;
            }

            filterChain.doFilter(request, response);
        } else {
            //  For all other endpoints (Swagger, Login, Flights, etc.), just let them through
            filterChain.doFilter(request, response);
        }
    }
}
