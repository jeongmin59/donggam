package com.example.backend.config;

import com.querydsl.jpa.impl.JPAQueryFactory;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class AppConfig {

  // jpa 관련
  // mariaDB EntityManager 등록
  @PersistenceContext(unitName = "mariaDBEntityManager")
  private EntityManager mariaDBEntityManager;

  // progreSQL EntityManager 등록
  @PersistenceContext(unitName = "progreSQLEntityManager")
  private EntityManager progreSQLEntityManager;

  // querydsl 관련 설정
  @Primary
  @Bean
  public JPAQueryFactory mariaDBQueryFactory() {
    return new JPAQueryFactory(mariaDBEntityManager);
  }

  @Bean
  @Qualifier("progreSQLQueryFactory")
  public JPAQueryFactory progreSQLQueryFactory() {
    return new JPAQueryFactory(progreSQLEntityManager);
  }

}
