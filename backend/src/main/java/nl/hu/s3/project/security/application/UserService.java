package nl.hu.s3.project.security.application;

import jakarta.transaction.Transactional;
import nl.hu.s3.project.security.data.UserRepository;
import nl.hu.s3.project.security.domain.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@Transactional
public class UserService implements UserDetailsService {
    @Value("${chips.start-amount}")
    private Long chipsStartAmount;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.userRepository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public void register(String username, String password, String firstName, String lastName) {
        String encodedPassword = this.passwordEncoder.encode(password);

        User user = new User(username, encodedPassword, firstName, lastName);

        this.userRepository.save(user);
    }

    @Override
    public User loadUserByUsername(String username) {
        Optional<User> maybeUser = this.userRepository.findByUsername(username);

        if (maybeUser.isEmpty()) {
            throw new UsernameNotFoundException(username);
        } else {
            return maybeUser.get();
        }
    }
}
