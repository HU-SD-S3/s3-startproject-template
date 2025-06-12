package nl.hu.s3.project.security.presentation.controller;

import nl.hu.s3.project.security.application.JwtTokenService;
import nl.hu.s3.project.security.application.SecurityService;
import nl.hu.s3.project.security.application.UserTokenData;
import nl.hu.s3.project.security.presentation.dto.Login;
import nl.hu.s3.project.security.presentation.dto.Registration;
import nl.hu.s3.project.security.presentation.dto.LoginResponse;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SecurityController {
    private final SecurityService securityService;
    private final JwtTokenService tokenService;

    public SecurityController(SecurityService userService, JwtTokenService tokenService) {
        this.securityService = userService;
        this.tokenService = tokenService;
    }

    @PostMapping("/register")
    public void register(@Validated @RequestBody Registration registration) {
        this.securityService.register(
                registration.username,
                registration.password,
                registration.firstName,
                registration.lastName
        );
    }

    @GetMapping("/login")
    public LoginResponse currentUser(UserTokenData profile) {
        return LoginResponse.fromUserToken(profile, null);
    }

    @PostMapping("/login")
    public LoginResponse login(@Validated @RequestBody Login login) {
        UserTokenData userToken = this.securityService.login(login);
        String token = this.tokenService.generateToken(userToken);
        return LoginResponse.fromUserToken(userToken, token);
    }
}
