package nl.hu.s3.project.security.presentation.dto;

import nl.hu.s3.project.security.application.UserTokenData;

public class LoginResponse {
    public String username;
    public String firstName;
    public String lastName;
    public String token;

    public static LoginResponse fromUserToken(UserTokenData profile, String token) {
        LoginResponse userDTO = new LoginResponse();
        userDTO.username = profile.username();
        userDTO.firstName = profile.firstName();
        userDTO.lastName = profile.lastName();
        userDTO.token = token;
        return userDTO;
    }
}
