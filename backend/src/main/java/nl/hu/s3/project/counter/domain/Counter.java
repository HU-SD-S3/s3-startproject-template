package nl.hu.s3.project.counter.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Counter {

    @Id
    //Als je alleen JPA gebruikt is het beter deze op AUTO te zetten, maar voor dit voorbeeld willen we ook SQL expliciet laten zien
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    public void setDatabaseGeneratedId(long generatedId) {
        if(this.id != null){
            throw new IllegalStateException("Database generated ID can only be set once.");
        }
        this.id = generatedId;
    }

    @Override
    public String toString() {
        return "Counter{" +
                "id=" + id +
                ", value=" + value +
                '}';
    }

    public static Counter fromDatabase(long id, int value){
        Counter counter = new Counter();
        counter.id = id;
        counter.value = value;
        return counter;
    }
}
