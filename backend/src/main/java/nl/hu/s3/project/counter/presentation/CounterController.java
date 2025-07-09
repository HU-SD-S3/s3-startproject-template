package nl.hu.s3.project.counter.presentation;

import nl.hu.s3.project.counter.application.CounterDTO;
import nl.hu.s3.project.counter.application.CounterService;
import nl.hu.s3.project.counter.application.IncrementDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CounterController {
    private final CounterService counterService;

    public CounterController(CounterService counterService) {
        this.counterService = counterService;
    }

    @GetMapping("/counter")
    public CounterDTO getCounterValue() {
        return counterService.getSingleCounter();

    }

    @PostMapping("/counter")
    public CounterDTO incrementCounter(@RequestBody IncrementDTO counterDTO) {
        return counterService.incrementCounter(counterDTO.increment());
    }
}
