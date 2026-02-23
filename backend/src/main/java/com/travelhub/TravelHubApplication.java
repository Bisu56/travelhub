package com.travelhub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class TravelHubApplication {

    public static void main(String[] args) {
        SpringApplication.run(TravelHubApplication.class, args);
    }

}
