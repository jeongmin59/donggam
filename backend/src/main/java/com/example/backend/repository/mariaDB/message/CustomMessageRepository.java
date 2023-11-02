package com.example.backend.repository.mariaDB.message;

import static com.example.backend.entity.mariaDB.member.QMember.member;
import static com.example.backend.entity.mariaDB.message.QMessage.message;

import com.example.backend.entity.mariaDB.message.Message;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class CustomMessageRepository extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public CustomMessageRepository(JPAQueryFactory queryFactory) {
        super(Message.class);
        this.queryFactory = queryFactory;
    }

    public List<Message> findAllByStatusId(Long statusId) {
        List<Message> result = queryFactory
                .selectFrom(message)
                .join(message.from, member)
                .where(message.status.id.eq(statusId))
                .fetch();
        return result;
    }
}
