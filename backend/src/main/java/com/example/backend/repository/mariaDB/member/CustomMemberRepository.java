package com.example.backend.repository.mariaDB.member;

import static com.example.backend.entity.mariaDB.member.QMember.member;
import static com.example.backend.entity.mariaDB.space.QRecord.record;
import static com.example.backend.entity.mariaDB.status.QStatus.status;
import static com.example.backend.entity.mariaDB.time.QImage.image;

import com.example.backend.entity.mariaDB.member.Member;
import com.example.backend.entity.mariaDB.status.QStatus;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.persistence.LockModeType;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class CustomMemberRepository extends QuerydslRepositorySupport {

    private final JPAQueryFactory queryFactory;

    public CustomMemberRepository(JPAQueryFactory queryFactory) {
        super(Member.class);
        this.queryFactory = queryFactory;
    }

//    public List<Member> findByIdInAndLastUpdateTimeAfter(List<Long> memberIds, LocalDateTime time) {
//        return queryFactory
//                .selectDistinct(member)
//                .from(member)
//                .leftJoin(member.status, status)
//                .where(member.id.in(memberIds).and(member.lastUpdateTime.after(time)))
//                .fetch();
//    }

    @Lock(LockModeType.PESSIMISTIC_READ)
    public Member findByIdAndLastUpdateTimeAfter(Long memberId, LocalDateTime time) {
        return queryFactory
                .selectFrom(member)
                .leftJoin(member.status, status)
                .where(member.id.eq(memberId).and(member.lastUpdateTime.after(time)))
                .fetchOne();
    }

    @Lock(LockModeType.PESSIMISTIC_READ)
    public Member findById(Long memberId) {
        return queryFactory
                .selectFrom(member)
                .leftJoin(member.status, status).fetchJoin()
                .where(member.id.eq(memberId))
                .fetchOne();
    }

    @Lock(LockModeType.PESSIMISTIC_READ)
    public Optional<Member> findOptionalById(Long memberId) {
        return Optional.ofNullable(queryFactory
                .selectFrom(member)
                .leftJoin(member.status, status)
                .where(member.id.eq(memberId))
                .fetchOne()
        );
    }

    @Lock(LockModeType.PESSIMISTIC_READ)
    public Member findWithRecordsById(Long memberId) {
        return queryFactory
                .selectFrom(member)
                .leftJoin(member.records, record)
                .where(member.id.eq(memberId))
                .fetchOne();
    }
}
