package com.travelhub.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KhaltiConfig {

    @Value("${khalti.secret-key}")
    private String secretKey;

    @Value("${khalti.return-url}")
    private String returnUrl;

    @Value("${khalti.website-url}")
    private String websiteUrl;

    public String getSecretKey() { return secretKey; }
    public String getReturnUrl() { return returnUrl; }
    public String getWebsiteUrl() { return websiteUrl; }
}