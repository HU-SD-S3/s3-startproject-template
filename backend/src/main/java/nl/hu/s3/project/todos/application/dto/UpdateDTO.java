package nl.hu.s3.project.todos.application.dto;

public record UpdateDTO(String title, boolean completed) {

    public void validate() {
        if (title == null || title.isBlank()) {
            throw new IllegalArgumentException("Title cannot be null or empty");
        }
    }
}
