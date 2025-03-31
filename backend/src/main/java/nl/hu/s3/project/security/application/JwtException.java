package nl.hu.s3.project.security.application;

public class JwtException extends RuntimeException {
    public JwtException(String message) {
        super(message);
    }
}
