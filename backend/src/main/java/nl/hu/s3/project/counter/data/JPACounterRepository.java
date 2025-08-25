package nl.hu.s3.project.counter.data;

import jakarta.persistence.EntityManager;
import nl.hu.s3.project.counter.domain.Counter;

import java.util.List;

public class JPACounterRepository implements CounterRepository{

    private final EntityManager entities;

    public JPACounterRepository(EntityManager entities) {
        this.entities = entities;
    }

    @Override
    public List<Counter> findAll() {
        return this.entities.createQuery("select c from Counter c", Counter.class).getResultList();
    }

    @Override
    public void remove(Counter counter) {
        this.entities.remove(counter);
    }

    @Override
    public void add(Counter counter) {
        this.entities.persist(counter);
    }

    @Override
    public void update(Counter counter) {
        //JPA hoeft deze methode niet te implementeren:
        //Elk object dat je -uit- een repository haalt wordt getracked, en @Transactional (in de service)
        //zorgt er voor dat die wijzigingen gecommit worden aan het eind van elke methode.
    }
}
