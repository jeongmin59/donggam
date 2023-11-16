package com.example.backend.repository.mariaDB.status;

import static com.example.backend.entity.mariaDB.status.QStatus.status;
import static com.example.backend.entity.mariaDB.member.QMember.member;

import com.example.backend.entity.mariaDB.status.Status;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class CustomStatusRepository extends QuerydslRepositorySupport {

    private final JPAQueryFactory queryFactory;

    public CustomStatusRepository(JPAQueryFactory queryFactory) {
        super(Status.class);
        this.queryFactory = queryFactory;
    }

    public Status findWIthMemberById(Long statusId) {
        return queryFactory
                .selectFrom(status)
                .join(status.member, member)
                .where(status.id.eq(statusId))
                .fetchOne();
    }

}
