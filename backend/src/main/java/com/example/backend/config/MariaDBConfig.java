package com.example.backend.config;

import com.zaxxer.hikari.HikariDataSource;
import java.util.Map;
import javax.sql.DataSource;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateProperties;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateSettings;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
    basePackages = "com.example.backend.repository.mariaDB",
    entityManagerFactoryRef = "mariaDBEntityManagerFactory",
    transactionManagerRef = "mariaDBTransactionManager"
)
@RequiredArgsConstructor
public class MariaDBConfig {

  private final JpaProperties jpaProperties;
  private final HibernateProperties hibernateProperties;

  @Bean
  @Primary
  @ConfigurationProperties("spring.datasource")
  public DataSourceProperties mariaDBDatasourceProperties() {
    return new DataSourceProperties();
  }

  @Bean
  @Primary
  @ConfigurationProperties("spring.datasource.configuration")
  public DataSource mariaDBDatasource() {
    return mariaDBDatasourceProperties()
        .initializeDataSourceBuilder()
        .type(HikariDataSource.class)
        .build();
  }

  @Bean(name = "mariaDBEntityManagerFactory")
  @Primary
  public LocalContainerEntityManagerFactoryBean mariaDBEntityManagerFactory(
      EntityManagerFactoryBuilder builder) {

    Map<String, Object> properties = hibernateProperties.determineHibernateProperties(jpaProperties.getProperties(), new HibernateSettings());
    DataSource dataSource = mariaDBDatasource();
    return builder
        .dataSource(dataSource)
        .packages("com.example.backend.entity.mariaDB")
        .persistenceUnit("mariaDBEntityManager")
        .properties(properties)
        .build();
  }

  @Bean(name = "mariaDBTransactionManager")
  @Primary
  public PlatformTransactionManager mariaDBTransactionManager(
      final @Qualifier("mariaDBEntityManagerFactory") LocalContainerEntityManagerFactoryBean localContainerEntityManagerFactoryBean
  ) {
    return new JpaTransactionManager(localContainerEntityManagerFactoryBean.getObject());
  }
}
