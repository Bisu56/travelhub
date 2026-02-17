package com.travelhub.utils;

import org.springframework.stereotype.Component;

@Component
public class PhoneSmsUtil {

    public void sendSms(String phoneNumber, String message) {

        System.out.println("Sending SMS to " + phoneNumber + ": " + message);


    }
}
