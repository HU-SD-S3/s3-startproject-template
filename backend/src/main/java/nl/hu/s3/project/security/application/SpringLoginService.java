package nl.hu.s3.project.security.application;

import jakarta.transaction.Transactional;
import nl.hu.s3.project.security.data.UserRepository;
import nl.hu.s3.project.security.domain.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@Transactional
public class SpringLoginService implements UserDetailsService {

    private final UserRepository userRepository;

    SpringLoginService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        Optional<User> maybeUser = this.userRepository.findByUsername(username);

        if (maybeUser.isEmpty()) {
            throw new UsernameNotFoundException(username);
        } else {
            return new UserDetailsAdapter(maybeUser.get());
        }
    }

}
