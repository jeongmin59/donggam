package com.example.backend.repository.mariaDB.record;

import static com.example.backend.entity.mariaDB.member.QMember.member;
import static com.example.backend.entity.mariaDB.space.QRecord.record;
import static com.example.backend.entity.mariaDB.space.QRecordComment.recordComment;

import com.example.backend.entity.mariaDB.space.Record;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.Optional;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class CustomRecordRepository extends QuerydslRepositorySupport{

    private final JPAQueryFactory queryFactory;

    public CustomRecordRepository(JPAQueryFactory queryFactory) {
        super(Record.class);
        this.queryFactory = queryFactory;
    }

    public Optional<Record> findById(Long recordId) {
        return Optional.ofNullable(queryFactory
                .selectFrom(record)
                .leftJoin(record.member, member)
                .leftJoin(record.comments, recordComment).fetchJoin()
                .where(record.id.eq(recordId))
                .fetchOne()
        );
    }

    public Record findWithCommentById(Long recordId) {
        return queryFactory
                .selectFrom(record)
                .leftJoin(record.comments, recordComment).fetchJoin()
                .where(record.id.eq(recordId))
                .fetchOne();
    }

    public Record findWithAuthorById(Long recordId) {
        return queryFactory
                .selectFrom(record)
                .join(record.member, member)
                .where(record.id.eq(recordId))
                .fetchOne();
    }
}
