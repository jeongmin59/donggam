package com.example.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration

public class CorsConfig implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
        .allowedOrigins("http://localhost:5173", "https://k9e107a.p.ssafy.io", "https://donggam.site")
        .allowedMethods("OPTIONS", "POST", "GET", "DELETE", "PUT")
        .allowedHeaders("*")
        .allowCredentials(true)
        .maxAge(3600);
  }
}
