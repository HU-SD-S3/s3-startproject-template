package nl.hu.s3.project.todos.presentation;

import nl.hu.s3.project.security.application.UserTokenData;
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
    public List<ItemDTO> getItems(UserTokenData user){
        return this.toDoService.getItems(user.username());
    }

    @GetMapping("/{id}")
    public ItemDTO getItem(UserTokenData user, @PathVariable Long id){
        return this.toDoService.getItem(user.username(), id)
                .orElseThrow(() -> new RuntimeException("Item not found"));
    }

    @PostMapping
    public void addItem(UserTokenData user, @RequestBody NewItemDTO item){
        item.validate();
        this.toDoService.addItem(user.username(), item);
    }

    @DeleteMapping("/{id}")
    public void deleteItem(UserTokenData user, @PathVariable Long id){
        this.toDoService.deleteItem(user.username(), id);
    }

    @PutMapping("/{id}")
    public void updateItem(UserTokenData user, @PathVariable Long id, @RequestBody UpdateDTO item){
        item.validate();
        this.toDoService.updateItem(user.username(), id, item);
    }
}
