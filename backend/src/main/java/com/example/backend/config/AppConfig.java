package com.example.backend.config;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

  // jpa 관련
  // mariaDB EntityManager 등록
  @PersistenceContext(unitName = "mariaDBEntityManager")
  private EntityManager mariaDBEntityManager;

  // progreSQL EntityManager 등록
  @PersistenceContext(unitName = "progreSQLEntityManager")
  private EntityManager progreSQLEntityManager;



}
