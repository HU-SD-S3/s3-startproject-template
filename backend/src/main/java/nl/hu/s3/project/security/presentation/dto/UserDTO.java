package nl.hu.s3.project.security.presentation.dto;

import nl.hu.s3.project.security.domain.User;

public record UserDTO(String username, boolean enabled) {
    public static UserDTO fromUser(User user) {
        return new UserDTO(user.getUsername(), user.isEnabled());
    }
}
