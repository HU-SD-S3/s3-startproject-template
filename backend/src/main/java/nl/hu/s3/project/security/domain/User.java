package nl.hu.s3.project.security.domain;

import nl.hu.s3.project.security.application.CurrentUser;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    public static final String ROLE_USER = "ROLE_USER";
    public static final String ROLE_ADMIN = "ROLE_ADMIN";

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private boolean enabled = true;

    @ElementCollection
    private List<String> roles = new ArrayList<>();

    protected User() {
    }

    public User(String username, String password, String firstName, String lastName) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roles = List.of(ROLE_USER);
    }

    public static User admin(String username, String password, String firstName, String lastName) {
        User user = new User(username, password, firstName, lastName);
        user.roles = List.of(ROLE_ADMIN);
        return user;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void adminUpdate(String firstName, String lastName, boolean isEnabled) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.enabled = isEnabled;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public Collection<String> getRoles() {
        return this.roles;
    }
}
