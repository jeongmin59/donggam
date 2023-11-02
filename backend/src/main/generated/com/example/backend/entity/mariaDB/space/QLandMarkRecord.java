package com.example.backend.entity.mariaDB.space;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QLandMarkRecord is a Querydsl query type for LandMarkRecord
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLandMarkRecord extends EntityPathBase<LandMarkRecord> {

    private static final long serialVersionUID = 1969988843L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QLandMarkRecord landMarkRecord = new QLandMarkRecord("landMarkRecord");

    public final ListPath<LandMarkRecordComment, QLandMarkRecordComment> comments = this.<LandMarkRecordComment, QLandMarkRecordComment>createList("comments", LandMarkRecordComment.class, QLandMarkRecordComment.class, PathInits.DIRECT2);

    public final StringPath content = createString("content");

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath imageAddress = createString("imageAddress");

    public final QLandMark landMark;

    public final com.example.backend.entity.mariaDB.member.QMember member;

    public QLandMarkRecord(String variable) {
        this(LandMarkRecord.class, forVariable(variable), INITS);
    }

    public QLandMarkRecord(Path<? extends LandMarkRecord> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QLandMarkRecord(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QLandMarkRecord(PathMetadata metadata, PathInits inits) {
        this(LandMarkRecord.class, metadata, inits);
    }

    public QLandMarkRecord(Class<? extends LandMarkRecord> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.landMark = inits.isInitialized("landMark") ? new QLandMark(forProperty("landMark")) : null;
        this.member = inits.isInitialized("member") ? new com.example.backend.entity.mariaDB.member.QMember(forProperty("member")) : null;
    }

}

