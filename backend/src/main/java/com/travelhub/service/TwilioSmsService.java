package com.travelhub.service;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TwilioSmsService {

    @Value("${twilio.phone-number}")
    private String fromNumber;

    public void sendSms(String to, String messageBody) {

        try {
            Message.creator(
                    new PhoneNumber(to),
                    new PhoneNumber(fromNumber),
                    messageBody
            ).create();
        } catch (Exception ex) {
            throw new RuntimeException("Failed to send SMS via Twilio: " + ex.getMessage());
        }
    }
}
