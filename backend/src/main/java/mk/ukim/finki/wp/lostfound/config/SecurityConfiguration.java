package mk.ukim.finki.wp.lostfound.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Profile(("!cas"))
@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends AuthConfig {


    public SecurityConfiguration(JwtAuthenticationEntryPoint authenticationEntryPoint, JwtAuthenticationFilter authenticationFilter) {
        super(authenticationEntryPoint, authenticationFilter);
    }

    @Bean
    @Order(1100)
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        this.authorize(http);
        http.httpBasic((basic) -> basic.realmName("wp.finki.ukim.mk"));
        return http.build();
    }
}
