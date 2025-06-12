package nl.hu.s3.project.security.application;

import nl.hu.s3.project.security.domain.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class UserDetailsAdapter implements UserDetails {
    private User user;

    public UserDetailsAdapter(User user) {
        this.user = user;
    }

    @Override
    public boolean isEnabled() {
        return this.user.isEnabled();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.user.getRoles().stream().map(SimpleGrantedAuthority::new).toList();
    }

    @Override
    public String getPassword() {
        return this.user.getPassword();
    }

    @Override
    public String getUsername() {
        return this.user.getUsername();
    }

    public UserTokenData toToken() {
        return new UserTokenData(
                this.user.getUsername(),
                this.user.getFirstName(),
                this.user.getLastName(),
                this.user.getRoles().stream().toList()
        );
    }
}
