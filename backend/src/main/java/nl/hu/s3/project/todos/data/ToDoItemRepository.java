package nl.hu.s3.project.todos.data;

import nl.hu.s3.project.todos.application.dto.ItemDTO;
import nl.hu.s3.project.todos.domain.Owner;
import nl.hu.s3.project.todos.domain.ToDoItem;
import java.util.List;
import java.util.Optional;

public interface ToDoItemRepository {
     Optional<ToDoItem> findById(Long id);
     void save(ToDoItem todo);
     void deleteById(Long id);
     List<ToDoItem> findByOwner(Owner owner);
}
