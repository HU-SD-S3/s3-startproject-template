package nl.hu.s3.project.counter;

import jakarta.persistence.EntityManager;
import nl.hu.s3.project.counter.data.CounterRepository;
import nl.hu.s3.project.counter.data.InMemoryCounter;
import nl.hu.s3.project.counter.data.JPACounterRepository;
import nl.hu.s3.project.counter.data.SqlCounterRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class CounterConfiguration {

    public static enum RepositoryType {
        JPA, SQL, INMEMORY
    }

    @Value("${app.repository.type}")
    private RepositoryType repositoryType;

    @Bean
    public CounterRepository counterRepository(EntityManager entities, DataSource dataSource) {
        return switch (this.repositoryType) {
            case JPA -> new JPACounterRepository(entities);
            case SQL -> new SqlCounterRepository(dataSource);
            case INMEMORY -> new InMemoryCounter();
        };
    }
}
