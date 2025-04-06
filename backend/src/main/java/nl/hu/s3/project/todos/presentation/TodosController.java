package nl.hu.s3.project.todos.presentation;

import nl.hu.s3.project.security.domain.UserProfile;
import nl.hu.s3.project.todos.application.ToDoService;
import nl.hu.s3.project.todos.application.dto.ItemDTO;
import nl.hu.s3.project.todos.application.dto.NewItemDTO;
import nl.hu.s3.project.todos.application.dto.UpdateDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
public class TodosController {

    private final ToDoService toDoService;

    public TodosController(ToDoService toDoService) {
        this.toDoService = toDoService;
    }

    @GetMapping
    public List<ItemDTO> getItems(UserProfile user){
        return this.toDoService.getItems(user.getUsername());
    }

    @GetMapping("/{id}")
    public ItemDTO getItem(UserProfile user, @PathVariable Long id){
        return this.toDoService.getItem(user.getUsername(), id)
                .orElseThrow(() -> new RuntimeException("Item not found"));
    }

    @PostMapping
    public void addItem(UserProfile user, @RequestBody NewItemDTO item){
        item.validate();
        this.toDoService.addItem(user.getUsername(), item);
    }

    @DeleteMapping("/{id}")
    public void deleteItem(UserProfile user, @PathVariable Long id){
        this.toDoService.deleteItem(user.getUsername(), id);
    }

    @PutMapping("/{id}")
    public void updateItem(UserProfile user, @PathVariable Long id, @RequestBody UpdateDTO item){
        item.validate();
        this.toDoService.updateItem(user.getUsername(), id, item);
    }
}
