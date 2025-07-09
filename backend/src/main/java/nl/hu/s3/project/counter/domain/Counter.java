package nl.hu.s3.project.counter.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Counter {
    @Id
    @GeneratedValue
    private Long id;
    private int value;

    public Long getId() {
        return id;
    }

    public int getValue() {
        return value;
    }

    public void increment() {
        this.value++;
    }

    @Override
    public String toString() {
        return "Counter{" +
                "id=" + id +
                ", value=" + value +
                '}';
    }
}
