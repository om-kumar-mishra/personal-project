package com.example.kafka;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/kafka")
public class KafkaController {

    private final MessageProducer producer;

    public KafkaController(MessageProducer producer) {
        this.producer = producer;
    }

    @GetMapping("/send")
    public String sendMessage(
            @RequestParam String msg
    ) {

        producer.sendMessage(msg);

        return "Message Sent Successfully";
    }
}