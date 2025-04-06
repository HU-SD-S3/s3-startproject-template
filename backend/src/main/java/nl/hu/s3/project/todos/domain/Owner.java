package nl.hu.s3.project.todos.domain;

import jakarta.persistence.Embeddable;

@Embeddable
public record Owner(String username) {
    protected Owner() {
        this("");
    }
}
