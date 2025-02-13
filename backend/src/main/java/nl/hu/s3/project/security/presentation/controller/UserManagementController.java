package nl.hu.s3.project.security.presentation.controller;

import jakarta.annotation.security.RolesAllowed;
import nl.hu.s3.project.security.application.UserService;
import nl.hu.s3.project.security.domain.User;
import nl.hu.s3.project.security.presentation.dto.Registration;
import nl.hu.s3.project.security.presentation.dto.UserDTO;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RolesAllowed(User.ROLE_ADMIN)
public class UserManagementController {

    private final UserService userService;

    public UserManagementController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<UserDTO> getUsers(){
        return userService.getUsers().stream().map(UserDTO::fromUser).toList();
    }

    @PostMapping("/users")
    public UserDTO register(@Validated @RequestBody Registration registration) {
        this.userService.register(
                registration.username,
                registration.password,
                registration.firstName,
                registration.lastName
        );
        return this.getUser(registration.username).orElseThrow();
    }

    @GetMapping("/users/{id}")
    public Optional<UserDTO> getUser(@PathVariable String id){
        return Optional.ofNullable(userService.loadUserByUsername(id)).map(UserDTO::fromUser);
    }

    @PutMapping("/users/{id}")
    public Optional<UserDTO> getUser(@PathVariable String id, @Validated @RequestBody UserDTO userDto){
        User user = userService.loadUserByUsername(id);
        if(user == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        userDto.update(user);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable String id){
        try{
            userService.deleteUser(id);
        }catch (UsernameNotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }
}
