package com.example.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class PyamentConsumer {
     @KafkaListener(
            topics = "test-topic",
            groupId = "my-group1"
    )
    public void consume(String message) {

        System.out.println("Received Message payment : " + message);
    }
}
