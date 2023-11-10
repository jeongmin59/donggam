package com.example.backend.entity.mariaDB.space;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRecordComment is a Querydsl query type for RecordComment
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRecordComment extends EntityPathBase<RecordComment> {

    private static final long serialVersionUID = 211636588L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRecordComment recordComment = new QRecordComment("recordComment");

    public final StringPath content = createString("content");

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.example.backend.entity.mariaDB.member.QMember member;

    public final QRecord record;

    public QRecordComment(String variable) {
        this(RecordComment.class, forVariable(variable), INITS);
    }

    public QRecordComment(Path<? extends RecordComment> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRecordComment(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRecordComment(PathMetadata metadata, PathInits inits) {
        this(RecordComment.class, metadata, inits);
    }

    public QRecordComment(Class<? extends RecordComment> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.example.backend.entity.mariaDB.member.QMember(forProperty("member")) : null;
        this.record = inits.isInitialized("record") ? new QRecord(forProperty("record"), inits.get("record")) : null;
    }

}

