package com.example.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
        .csrf().disable()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

        .and()
        .formLogin().disable()
        .httpBasic().disable()

        .authorizeRequests()
        .antMatchers("/**").permitAll()
        .anyRequest().permitAll()

        .and()
        .build();
  }
}
