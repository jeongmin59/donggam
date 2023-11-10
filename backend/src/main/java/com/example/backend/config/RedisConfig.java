package com.example.backend.config;

import com.example.backend.service.chat.RedisSubscriber;
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
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
//@EnableTransactionManagement
//@EnableJpaRepositories(
//        basePackages = "com.example.backend.repository.redis",
//        entityManagerFactoryRef = "mariaDBEntityManagerFactory",
//        transactionManagerRef = "redisTransactionManager"
//)
@RequiredArgsConstructor
public class RedisConfig {
//    private final JpaProperties jpaProperties;
//    private final HibernateProperties hibernateProperties;
//
//    @Bean
//    @Primary
//    @ConfigurationProperties("spring.third-datasource")
//    public DataSourceProperties redisDatasourceProperties() {
//        return new DataSourceProperties();
//    }
//
//    @Bean
//    @ConfigurationProperties("spring.third-datasource.configuration")
//    public DataSource redisDatasource() {
//        return redisDatasourceProperties()
//                .initializeDataSourceBuilder()
//                .type(HikariDataSource.class)
//                .build();
//    }
//
//    @Bean(name = "redisEntityManagerFactory")
//    public LocalContainerEntityManagerFactoryBean redisEntityManagerFactory(
//            EntityManagerFactoryBuilder builder) {
//        Map<String, Object> properties = hibernateProperties.determineHibernateProperties(jpaProperties.getProperties(), new HibernateSettings());
//        DataSource dataSource = redisDatasource();
//        return builder
//                .dataSource(dataSource)
//                .packages("com.example.backend.entity.redis")
//                .persistenceUnit("redisEntityManager")
//                .properties(properties)
//                .build();
//    }
//
//    @Bean(name = "redisTransactionManager")
//    public PlatformTransactionManager redisTransactionManager(
//            final @Qualifier("redisEntityManagerFactory") LocalContainerEntityManagerFactoryBean localContainerEntityManagerFactoryBean
//    ) {
//        return new JpaTransactionManager(localContainerEntityManagerFactoryBean.getObject());
//    }

    @Bean
    public RedisMessageListenerContainer redisMessageListenerContainer(
            RedisConnectionFactory connectionFactory,
            MessageListenerAdapter listenerAdapter,
            ChannelTopic channelTopic
    ) {
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        container.addMessageListener(listenerAdapter, channelTopic);
        return container;
    }

    @Bean
    public MessageListenerAdapter listenerAdapter(RedisSubscriber subscriber) {
        return new MessageListenerAdapter(subscriber, "onMessage");
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate
            (RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(connectionFactory);
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(String.class));
        return redisTemplate;
    }

    @Bean
    public ChannelTopic channelTopic() {
        return new ChannelTopic("chatroom");
    }
}
