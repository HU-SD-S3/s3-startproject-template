package nl.hu.s3.project.security.presentation.dto;

public class Login {
    public String username;
    public String password;

    public Login(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
