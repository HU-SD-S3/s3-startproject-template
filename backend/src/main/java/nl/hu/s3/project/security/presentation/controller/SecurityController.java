package nl.hu.s3.project.security.presentation.controller;

import nl.hu.s3.project.security.application.TokenService;
import nl.hu.s3.project.security.application.UserService;
import nl.hu.s3.project.security.domain.User;
import nl.hu.s3.project.security.application.CurrentUser;
import nl.hu.s3.project.security.presentation.dto.Login;
import nl.hu.s3.project.security.presentation.dto.Registration;
import nl.hu.s3.project.security.presentation.dto.LoginResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
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

    @GetMapping("/login")
    public LoginResponse currentUser(CurrentUser profile) {
        return LoginResponse.fromUserProfile(profile, null);
    }

    @PostMapping("/login")
    public LoginResponse login(@Validated @RequestBody Login login) {
        Authentication authentication = this.authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(login.username, login.password)
        );
        UserDetails user = (UserDetails) authentication.getPrincipal();

        String token = tokenService.generateToken(user.toUserProfile());
        return LoginResponse.fromUser(user, token);
    }
}
