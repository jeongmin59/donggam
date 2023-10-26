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
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
    basePackages = "com.example.backend.repository.postgreSQL",
    entityManagerFactoryRef = "postgreSQLEntityManagerFactory",
    transactionManagerRef = "postgreSQLTransactionManager"
)
@RequiredArgsConstructor
public class PostgreSQLConfig {

  private final JpaProperties jpaProperties;
  private final HibernateProperties hibernateProperties;

  @Bean
  @ConfigurationProperties("spring.second-datasource")
  public DataSourceProperties postgreSQLDatasourceProperties() {
    return new DataSourceProperties();
  }

  @Bean
  @ConfigurationProperties("spring.second-datasource.configuration")
  public DataSource postgreSQLDatasource() {
    return postgreSQLDatasourceProperties()
        .initializeDataSourceBuilder()
        .type(HikariDataSource.class)
        .build();
  }

  @Bean(name = "postgreSQLEntityManagerFactory")
  public LocalContainerEntityManagerFactoryBean postgreSQLEntityManagerFactory(
      EntityManagerFactoryBuilder builder) {
    Map<String, Object> properties = hibernateProperties.determineHibernateProperties(jpaProperties.getProperties(), new HibernateSettings());
    DataSource dataSource = postgreSQLDatasource();
    return builder
        .dataSource(dataSource)
        .packages("com.example.backend.entity.postgreSQL")
        .persistenceUnit("postgreSQLEntityManager")
        .properties(properties)
        .build();
  }

  @Bean(name = "postgreSQLTransactionManager")
  public PlatformTransactionManager postgreSQLTransactionManager(
      final @Qualifier("postgreSQLEntityManagerFactory") LocalContainerEntityManagerFactoryBean localContainerEntityManagerFactoryBean
  ) {
    return new JpaTransactionManager(localContainerEntityManagerFactoryBean.getObject());
  }
}
