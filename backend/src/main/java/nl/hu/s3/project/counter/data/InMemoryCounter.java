package nl.hu.s3.project.counter.data;

import nl.hu.s3.project.counter.domain.Counter;

import java.util.List;

public class InMemoryCounter implements CounterRepository{
    private final Counter counter = new Counter();

    @Override
    public List<Counter> findAll() {
        return List.of(counter);
    }

    @Override
    public void remove(Counter counter) {

    }

    @Override
    public void add(Counter counter) {

    }

    @Override
    public void update(Counter counter) {

    }
}
