package nl.hu.s3.project.todos.data;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityManager;
import nl.hu.s3.project.todos.application.dto.ItemDTO;
import nl.hu.s3.project.todos.domain.Owner;
import nl.hu.s3.project.todos.domain.ToDoItem;
import nl.hu.s3.project.todos.domain.ToDoList;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class JpaToDoRepository implements ToDoItemRepository {

    private final EntityManager entities;

    public JpaToDoRepository(EntityManager entities) {
        this.entities = entities;
    }

    @Override
    public Optional<ToDoItem> findById(Long id) {
        return Optional.ofNullable(entities.find(ToDoItem.class, id));
    }

    @Override
    public void save(ToDoItem todo) {
        entities.persist(todo);
    }

    @Override
    public void deleteById(Long id) {
        this.findById(id).ifPresent(entities::remove);
    }

    @Override
    public List<ToDoItem> findByOwner(Owner owner) {
        return entities.createQuery("SELECT i from ToDoItem i where i.owner = :owner", ToDoItem.class)
                .setParameter("owner", owner)
                .getResultList();
    }
}
