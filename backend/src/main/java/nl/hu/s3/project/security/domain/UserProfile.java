package nl.hu.s3.project.security.domain;

import java.util.Collections;
import java.util.List;

public class UserProfile {
    private final String username;
    private final String firstName;
    private final String lastName;
    private final List<String> roles;

    public UserProfile(String username, String firstName, String lastName, List<String> roles) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roles = roles;
    }

    public String getUsername() {
        return username;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public List<String> getRoles() {
        return Collections.unmodifiableList(roles);
    }
}
