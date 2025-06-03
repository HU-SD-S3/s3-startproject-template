package nl.hu.s3.project.security.presentation.dto;

import nl.hu.s3.project.security.domain.User;
import nl.hu.s3.project.security.application.CurrentUser;

public class LoginResponse {
    public String username;
    public String firstName;
    public String lastName;
    public String token;

    public static LoginResponse fromUser(User user, String token){
        LoginResponse userDTO = new LoginResponse();
        userDTO.username = user.getUsername();
        userDTO.firstName = user.getFirstName();
        userDTO.lastName = user.getLastName();
        userDTO.token = token;
        return userDTO;
    }

    public static LoginResponse fromUserProfile(CurrentUser profile, String token) {
        LoginResponse userDTO = new LoginResponse();
        userDTO.username = profile.username();
        userDTO.firstName = profile.firstName();
        userDTO.lastName = profile.lastName();
        userDTO.token = token;
        return userDTO;
    }
}
