package nl.hu.s3.project.security.presentation.controller;

import nl.hu.s3.project.security.application.TokenService;
import nl.hu.s3.project.security.application.UserService;
import nl.hu.s3.project.security.domain.User;
import nl.hu.s3.project.security.presentation.dto.Login;
import nl.hu.s3.project.security.presentation.dto.Registration;
import nl.hu.s3.project.security.presentation.dto.LoginResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SecurityController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    public SecurityController(AuthenticationManager authenticationManager, UserService userService, TokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.tokenService = tokenService;
    }

    @PostMapping("/register")
    public void register(@Validated @RequestBody Registration registration) {
        this.userService.register(
                registration.username,
                registration.password,
                registration.firstName,
                registration.lastName
        );
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Validated @RequestBody Login login) {
        Authentication authentication = this.authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(login.username, login.password)
        );
        User user = (User) authentication.getPrincipal();

        String token = tokenService.generateToken(user.toUserProfile());
        LoginResponse dto = LoginResponse.fromUser(user, token);
        ResponseEntity<LoginResponse> response = ResponseEntity.ok(dto);
        return response;
    }
}
