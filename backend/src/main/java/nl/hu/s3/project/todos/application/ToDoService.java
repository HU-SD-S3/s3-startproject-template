package nl.hu.s3.project.todos.application;

import jakarta.transaction.Transactional;
import nl.hu.s3.project.todos.application.dto.ItemDTO;
import nl.hu.s3.project.todos.application.dto.NewItemDTO;
import nl.hu.s3.project.todos.application.dto.UpdateDTO;
import nl.hu.s3.project.todos.data.ToDoItemRepository;
import nl.hu.s3.project.todos.domain.Owner;
import nl.hu.s3.project.todos.domain.ToDoItem;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@Transactional
public class ToDoService {

    private final ToDoItemRepository todoItems;

    public ToDoService(ToDoItemRepository toDoItemRepository) {
        this.todoItems = toDoItemRepository;
    }

    public List<ItemDTO> getItems(String currentUser) {
        return this.todoItems.findByOwner(new Owner(currentUser))
                .stream()
                .map(ItemDTO::fromItem)
                .toList();
    }

    public Optional<ItemDTO> getItem(String currentUser, Long id) {
        Optional<ToDoItem> item = this.todoItems.findById(id);

        if (item.isPresent() && item.get().getOwner().username().equals(currentUser)) {
            return Optional.of(ItemDTO.fromItem(item.get()));
        } else {
            return Optional.empty();
        }
    }

    public void addItem(String currentUser, NewItemDTO item) {
        ToDoItem newItem = new ToDoItem(item.title(), new Owner(currentUser));
        this.todoItems.save(newItem);
    }

    public void deleteItem(String currentUser, Long id) {
        Optional<ToDoItem> item = this.todoItems.findById(id);

        if (item.isPresent() && item.get().getOwner().username().equals(currentUser)) {
            todoItems.deleteById(id);
        }
    }

    public void updateItem(String username, Long id, UpdateDTO updateItem) {
        Optional<ToDoItem> maybeItem = this.todoItems.findById(id);

        if (maybeItem.isPresent() && maybeItem.get().getOwner().username().equals(username)) {
            ToDoItem foundItem = maybeItem.get();
            foundItem.setTitle(updateItem.title());
            if (updateItem.completed() != foundItem.isCompleted()) {
                foundItem.toggleCompleted();
            }
        }
    }
}
