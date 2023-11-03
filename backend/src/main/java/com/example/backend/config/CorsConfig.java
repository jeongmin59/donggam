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
        .allowedOrigins("http://localhost:5173", "http://k9e107a.p.ssafy.io",
            "https://k9e107a.p.ssafy.io", "http://ditto.site", "https://ditto.site")
        .allowedMethods("OPTIONS", "POST", "GET", "DELETE", "PUT")
        .allowedHeaders("*")
        .maxAge(3600);
  }
}
