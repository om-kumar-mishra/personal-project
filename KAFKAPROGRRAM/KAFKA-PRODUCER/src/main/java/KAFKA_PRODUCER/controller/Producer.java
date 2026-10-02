package KAFKA_PRODUCER.controller;

import KAFKA_PRODUCER.dto.EmployeeDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Producer {
    public static final String EMPLOYEE_TOPIC="employee_topic";
    private final KafkaTemplate<String,Object> kafkaTemplate;
    private final ObjectMapper objectMapper;


    public Producer(KafkaTemplate<String, Object> kafkaTemplate, ObjectMapper objectMapper) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
    }

    @PostMapping("/publish")
    public String publichsMessageToKafka(@RequestBody EmployeeDto employeeDto)
    {

      try{
          String employeeAsString= objectMapper.writeValueAsString(employeeDto);
          kafkaTemplate.send(EMPLOYEE_TOPIC,employeeAsString);
      }
      catch(JsonProcessingException e)
      {
       throw new RuntimeException(e);
      }
      return "Message set to kafka";
    }
}
