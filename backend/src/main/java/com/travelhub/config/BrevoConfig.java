package com.travelhub.config;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "brevo")
@Getter
@Setter
public class BrevoConfig {
    private String apiKey;
    private Email email;
    private String smsSender;

    @Getter
    @Setter
    public static class Email {
        private String senderName;
        private String senderEmail;
    }
}
