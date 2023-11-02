package com.example.backend.repository.mariaDB.landmark;

import static com.example.backend.entity.mariaDB.space.QLandMark.landMark;
import static com.example.backend.entity.mariaDB.space.QLandMarkRecord.landMarkRecord;
import static com.example.backend.entity.mariaDB.space.QRecord.record;

import com.example.backend.entity.mariaDB.space.LandMark;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.Optional;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class CustomLandMarkRepository extends QuerydslRepositorySupport {

    private final JPAQueryFactory queryFactory;

    public CustomLandMarkRepository(JPAQueryFactory queryFactory) {
        super(LandMark.class);
        this.queryFactory = queryFactory;
    }

    public Optional<LandMark> findById(Long landMarkId) {
        return Optional.ofNullable(queryFactory
                .selectFrom(landMark)
                .leftJoin(landMark.records, landMarkRecord).fetchJoin()
                .where(landMark.id.eq(landMarkId))
                .fetchOne()
        );
    }

}
