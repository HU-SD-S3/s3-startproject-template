package nl.hu.s3.project.security.application;

import java.util.Collections;
import java.util.List;

public record CurrentUser(String username, String firstName, String lastName, List<String> roles) {
    @Override
    public List<String> roles() {
        return Collections.unmodifiableList(roles);
    }
}
