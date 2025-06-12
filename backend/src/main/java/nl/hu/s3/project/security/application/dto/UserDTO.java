package nl.hu.s3.project.security.application.dto;

import nl.hu.s3.project.security.domain.User;

public record UserDTO(String username, String firstName, String lastName, boolean enabled) {
    public static UserDTO fromUser(User user) {
        return new UserDTO(user.getUsername(), user.getFirstName(), user.getLastName(), user.isEnabled());
    }
}
