package nl.hu.s3.project.counter;

import jakarta.persistence.EntityManager;
import nl.hu.s3.project.counter.data.CounterRepository;
import nl.hu.s3.project.counter.data.JPACounterRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class CounterConfiguration {

    @Bean
    public CounterRepository counterRepository(EntityManager entities, DataSource dataSource) {
        return new JPACounterRepository(entities);
//        return new SqlCounterRepository(dataSource);
    }
}
