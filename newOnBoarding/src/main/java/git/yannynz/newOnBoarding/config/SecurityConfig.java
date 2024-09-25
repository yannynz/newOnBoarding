package git.yannynz.newOnBoarding.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Desativa a proteção CSRF, se necessário
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/reminders/**").permitAll() // Permite acesso aos endpoints de reminder
                        .requestMatchers("/auth/**").permitAll() // Permite acesso aos endpoints de autenticação
                        .requestMatchers("/users/**").permitAll() // Adiciona permissão para /users/**
                        .requestMatchers("/api/feedbacks/**").permitAll() // Permite acesso aos endpoints de feedback
                        .anyRequest().authenticated() // Requer autenticação para qualquer outra solicitação
                )
                .logout(logout -> logout
                        .permitAll()
                );

        return http.build();
    }
}
