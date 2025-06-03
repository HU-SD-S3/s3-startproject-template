package nl.hu.s3.project.security.application;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;

@Component
public class TokenService {
    private final Logger logger = LoggerFactory.getLogger(TokenService.class);

    @Value("${security.jwt.expiration-in-ms}")
    private Integer jwtExpirationInMs;
    @Value("${security.jwt.secret}")
    private String jwtSecret;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    public String generateToken(CurrentUser user) {

        List<String> roles = user.roles();
        String token = Jwts.builder()
                .header().add("typ", "JWT").and()
                .issuer("huland-casino-api")
                .audience().add("huland-casino").and()
                .subject(user.username())
                .expiration(new Date(System.currentTimeMillis() + this.jwtExpirationInMs))
                .claim("rol", roles)
                .claim("firstName", user.firstName())
                .claim("lastName", user.lastName())
                .signWith(this.getSigningKey())
                .compact();

        return token;
    }

    public CurrentUser validateToken(String token) {
        try {
            JwtParser jwtParser = Jwts.parser()
                    .verifyWith(this.getSigningKey())
                    .build();

            Jws<Claims> parsedToken = jwtParser.parseSignedClaims(token);

            var username = parsedToken.getPayload()
                    .getSubject();

            var authorities = ((List<String>) parsedToken.getPayload()
                    .get("rol")).stream()
                    .toList();

            if (username.isEmpty()) {
                throw new JwtException("Unable to validate token");
            }

            return new CurrentUser(
                    username,
                    (String) parsedToken.getBody().get("firstName"),
                    (String) parsedToken.getBody().get("lastName"),
                    authorities
            );
        } catch (MalformedJwtException | SignatureException ex) {
            logger.debug(ex.getMessage());
            throw new JwtException("Unable to validate token");
        }
    }
}
