package com.example.backend;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Around("execution(* com.example.backend.repository.*.*(..))")
    public Object logAroundRepositoryMethods(ProceedingJoinPoint joinPoint) throws Throwable {
        log.info("The method {}() begins with arguments: {}", joinPoint.getSignature().getName(), joinPoint.getArgs());
        try {
            Object result = joinPoint.proceed();
            log.info("The method {}() ends with result: {}", joinPoint.getSignature().getName(), result);
            return result;
        } catch (Exception e) {
            log.error("Exception in {}.{}() with cause = {}", joinPoint.getSignature().getDeclaringTypeName(),
                    joinPoint.getSignature().getName(), e.getCause() != null ? e.getCause() : "NULL");
            throw e;
        }
    }
}
