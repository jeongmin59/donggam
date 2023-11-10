package com.example.backend.entity.mariaDB.space;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QLandMarkRecordComment is a Querydsl query type for LandMarkRecordComment
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLandMarkRecordComment extends EntityPathBase<LandMarkRecordComment> {

    private static final long serialVersionUID = -460942604L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QLandMarkRecordComment landMarkRecordComment = new QLandMarkRecordComment("landMarkRecordComment");

    public final StringPath content = createString("content");

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QLandMarkRecord landMarkRecord;

    public final com.example.backend.entity.mariaDB.member.QMember member;

    public QLandMarkRecordComment(String variable) {
        this(LandMarkRecordComment.class, forVariable(variable), INITS);
    }

    public QLandMarkRecordComment(Path<? extends LandMarkRecordComment> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QLandMarkRecordComment(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QLandMarkRecordComment(PathMetadata metadata, PathInits inits) {
        this(LandMarkRecordComment.class, metadata, inits);
    }

    public QLandMarkRecordComment(Class<? extends LandMarkRecordComment> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.landMarkRecord = inits.isInitialized("landMarkRecord") ? new QLandMarkRecord(forProperty("landMarkRecord"), inits.get("landMarkRecord")) : null;
        this.member = inits.isInitialized("member") ? new com.example.backend.entity.mariaDB.member.QMember(forProperty("member")) : null;
    }

}

