package com.example.backend.repository.mariaDB.image;

import static com.example.backend.entity.mariaDB.member.QMember.member;
import static com.example.backend.entity.mariaDB.time.QImage.image;

import com.example.backend.entity.mariaDB.time.Image;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class CustomImageRepository extends QuerydslRepositorySupport {

    private final JPAQueryFactory queryFactory;

    public CustomImageRepository(JPAQueryFactory queryFactory) {
        super(Image.class);
        this.queryFactory = queryFactory;
    }

    public List<Image> findAllByIsActive(Boolean isActive) {
        return queryFactory
                .selectDistinct(image)
                .from(image)
                .leftJoin(image.author, member)
                .leftJoin(image.likeMember, member)
                .where(image.isActive.eq(isActive))
                .fetch();
    }

    public Image findByIdAndIsActive(Long imageId, Boolean isActive) {
        return queryFactory
                .selectFrom(image)
                .leftJoin(image.author, member)
                .leftJoin(image.likeMember, member)
                .where(image.id.eq(imageId).and(image.isActive.eq(isActive)))
                .fetchOne();
    }

    public List<Image> findTop3ByIsActiveOrderByLikeMemberDesc(Boolean isActive) {
        return queryFactory
                .selectFrom(image)
                .leftJoin(image.author, member)
                .leftJoin(image.likeMember, member)
                .orderBy(image.likeMember.size().coalesce(0).desc())
                .where(image.isActive.eq(isActive))
                .limit(3)
                .fetch();
    }
}
