package nl.hu.s3.project.todos.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class ToDoItem {
    @Id
    @GeneratedValue
    private Long id;

    private String title;
    private boolean completed;

    private Owner owner;

    protected ToDoItem(){}

    public ToDoItem(String title, Owner owner) {
        this.title = title;
        this.completed = false;
        this.owner = owner;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Owner getOwner() {
        return owner;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void toggleCompleted() {
        this.completed = !this.completed;
    }

}
