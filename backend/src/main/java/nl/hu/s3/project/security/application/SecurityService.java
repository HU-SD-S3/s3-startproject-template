package nl.hu.s3.project.security.application;

import jakarta.transaction.Transactional;
import nl.hu.s3.project.security.application.dto.UserDTO;
import nl.hu.s3.project.security.data.UserRepository;
import nl.hu.s3.project.security.domain.User;
import nl.hu.s3.project.security.presentation.dto.Login;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SecurityService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public SecurityService(UserRepository repository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userRepository = repository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public UserTokenData login(Login login) {
        Authentication authentication = this.authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(login.username, login.password)
        );
        UserDetailsAdapter user = (UserDetailsAdapter) authentication.getPrincipal();
        return user.toToken();
    }

    public void register(String username, String password, String firstName, String lastName) {
        String encodedPassword = this.passwordEncoder.encode(password);

        User user = new User(username, encodedPassword, firstName, lastName);
        if (user.getUsername().equals("admin")) {
            user = User.admin(username, encodedPassword, firstName, lastName);
        }

        this.userRepository.save(user);
    }

    public List<UserDTO> getUsers() {
        return this.userRepository.findAll().stream().map(UserDTO::fromUser).toList();
    }

    public Optional<UserDTO> getUser(String username) {
        return this.userRepository.findByUsername(username)
                .map(UserDTO::fromUser);
    }

    public Optional<UserDTO> updateUser(String username, UserDTO updatedFields) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            return Optional.empty();
        }

        user.get().adminUpdate(updatedFields.firstName(), updatedFields.lastName(), updatedFields.enabled());
        return Optional.of(UserDTO.fromUser(user.get()));
    }

    public void deleteUser(String username) {
        Optional<User> maybeUser = this.userRepository.findByUsername(username);

        if (maybeUser.isEmpty()) {
            throw new UsernameNotFoundException(username);
        } else {
            this.userRepository.delete(maybeUser.get());
        }
    }

}
