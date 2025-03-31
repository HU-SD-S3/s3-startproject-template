package nl.hu.s3.project.security.presentation.filter;


import io.jsonwebtoken.*;
import nl.hu.s3.project.security.application.TokenService;
import nl.hu.s3.project.security.domain.UserProfile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.List;

/**
 * Tries to authorize a user, based on the Bearer token (JWT) from
 * the Authorization header of the incoming request.
 */
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private final Logger logger = LoggerFactory.getLogger(JwtAuthorizationFilter.class);
    private final TokenService tokenService;

    public JwtAuthorizationFilter(
            TokenService tokenService,
            AuthenticationManager authenticationManager
    ) {
        super(authenticationManager);

        this.tokenService = tokenService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws IOException, ServletException {
        Authentication authentication = this.getAuthentication(request);
        if (authentication != null) {
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

    private Authentication getAuthentication(HttpServletRequest request) {
        try {
            String token = request.getHeader("Authorization");

            if (token == null || token.isEmpty()) {
                logger.debug("Authorization header is null or empty");
                return null;
            }

            if (!token.startsWith("Bearer ")) {
                logger.debug("Authorization header does not start with Bearer");
                return null;
            }

            UserProfile user = tokenService.validateToken(token.replace("Bearer ", ""));

            return new UsernamePasswordAuthenticationToken(user, null, user.getRoles().stream().map(SimpleGrantedAuthority::new).toList());
        } catch (Exception e) {
            return null;
        }
    }
}
