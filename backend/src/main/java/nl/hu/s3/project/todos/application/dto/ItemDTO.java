package nl.hu.s3.project.todos.application.dto;

import nl.hu.s3.project.todos.domain.ToDoItem;

public record ItemDTO(Long id, String title, boolean completed) {

    public static ItemDTO fromItem(ToDoItem item) {
        return new ItemDTO(item.getId(), item.getTitle(), item.isCompleted());
    }
}
