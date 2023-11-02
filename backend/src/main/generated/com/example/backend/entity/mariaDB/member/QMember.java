package com.example.backend.entity.mariaDB.member;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = 119468212L;

    public static final QMember member = new QMember("member1");

    public final EnumPath<Authority> authority = createEnum("authority", Authority.class);

    public final NumberPath<Integer> characterId = createNumber("characterId", Integer.class);

    public final StringPath email = createString("email");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final ListPath<com.example.backend.entity.mariaDB.space.LandMarkRecord, com.example.backend.entity.mariaDB.space.QLandMarkRecord> landMarkRecords = this.<com.example.backend.entity.mariaDB.space.LandMarkRecord, com.example.backend.entity.mariaDB.space.QLandMarkRecord>createList("landMarkRecords", com.example.backend.entity.mariaDB.space.LandMarkRecord.class, com.example.backend.entity.mariaDB.space.QLandMarkRecord.class, PathInits.DIRECT2);

    public final DateTimePath<java.time.LocalDateTime> lastUpdateTime = createDateTime("lastUpdateTime", java.time.LocalDateTime.class);

    public final ListPath<com.example.backend.entity.mariaDB.time.Image, com.example.backend.entity.mariaDB.time.QImage> likedImages = this.<com.example.backend.entity.mariaDB.time.Image, com.example.backend.entity.mariaDB.time.QImage>createList("likedImages", com.example.backend.entity.mariaDB.time.Image.class, com.example.backend.entity.mariaDB.time.QImage.class, PathInits.DIRECT2);

    public final ListPath<com.example.backend.entity.mariaDB.time.Image, com.example.backend.entity.mariaDB.time.QImage> myImages = this.<com.example.backend.entity.mariaDB.time.Image, com.example.backend.entity.mariaDB.time.QImage>createList("myImages", com.example.backend.entity.mariaDB.time.Image.class, com.example.backend.entity.mariaDB.time.QImage.class, PathInits.DIRECT2);

    public final StringPath nickname = createString("nickname");

    public final ListPath<com.example.backend.entity.mariaDB.space.Record, com.example.backend.entity.mariaDB.space.QRecord> records = this.<com.example.backend.entity.mariaDB.space.Record, com.example.backend.entity.mariaDB.space.QRecord>createList("records", com.example.backend.entity.mariaDB.space.Record.class, com.example.backend.entity.mariaDB.space.QRecord.class, PathInits.DIRECT2);

    public final ListPath<com.example.backend.entity.mariaDB.status.Status, com.example.backend.entity.mariaDB.status.QStatus> status = this.<com.example.backend.entity.mariaDB.status.Status, com.example.backend.entity.mariaDB.status.QStatus>createList("status", com.example.backend.entity.mariaDB.status.Status.class, com.example.backend.entity.mariaDB.status.QStatus.class, PathInits.DIRECT2);

    public QMember(String variable) {
        super(Member.class, forVariable(variable));
    }

    public QMember(Path<? extends Member> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMember(PathMetadata metadata) {
        super(Member.class, metadata);
    }

}

