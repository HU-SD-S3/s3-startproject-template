package nl.hu.s3.project.security.presentation.controller;

import jakarta.annotation.security.RolesAllowed;
import nl.hu.s3.project.security.application.SecurityService;
import nl.hu.s3.project.security.domain.User;
import nl.hu.s3.project.security.presentation.dto.Registration;
import nl.hu.s3.project.security.application.dto.UserDTO;
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

    private final SecurityService userService;

    public UserManagementController(SecurityService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<UserDTO> getUsers(){
        return userService.getUsers();
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

    @GetMapping("/users/{username}")
    public Optional<UserDTO> getUser(@PathVariable String username){
        Optional<UserDTO> foundUser = this.userService.getUser(username);

        if(foundUser.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        return foundUser;
    }

    @PutMapping("/users/{username}")
    public Optional<UserDTO> updateUser(@PathVariable String username, @Validated @RequestBody UserDTO userDto){
        Optional<UserDTO> updatedUser = this.userService.updateUser(username, userDto);

        if(updatedUser.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        return updatedUser;
    }

    @DeleteMapping("/users/{username}")
    public void deleteUser(@PathVariable String username){
        try{
            userService.deleteUser(username);
        }catch (UsernameNotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }
}
