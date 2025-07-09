package nl.hu.s3.project.counter.data;

import nl.hu.s3.project.counter.domain.Counter;

import javax.sql.DataSource;
import java.util.List;

public class SqlCounterRepository implements CounterRepository {

    private final DataSource dataSource;

    public SqlCounterRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public List<Counter> findAll() {
        return List.of();
    }

    @Override
    public void remove(Counter counter) {

    }

    @Override
    public void add(Counter counter) {

    }
}
