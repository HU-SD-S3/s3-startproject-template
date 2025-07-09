package nl.hu.s3.project.counter.data;

import nl.hu.s3.project.counter.domain.Counter;

import java.util.List;

public interface CounterRepository {
    List<Counter> findAll();

    void remove(Counter counter);

    void add(Counter counter);
}
