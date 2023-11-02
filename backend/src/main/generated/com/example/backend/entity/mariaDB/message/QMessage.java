package com.example.backend.entity.mariaDB.message;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMessage is a Querydsl query type for Message
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMessage extends EntityPathBase<Message> {

    private static final long serialVersionUID = 1181867942L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMessage message = new QMessage("message");

    public final StringPath content = createString("content");

    public final com.example.backend.entity.mariaDB.member.QMember from;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath imgAddress = createString("imgAddress");

    public final BooleanPath isLiked = createBoolean("isLiked");

    public final BooleanPath isRead = createBoolean("isRead");

    public final DatePath<java.time.LocalDate> localDate = createDate("localDate", java.time.LocalDate.class);

    public final com.example.backend.entity.mariaDB.status.QStatus status;

    public QMessage(String variable) {
        this(Message.class, forVariable(variable), INITS);
    }

    public QMessage(Path<? extends Message> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMessage(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMessage(PathMetadata metadata, PathInits inits) {
        this(Message.class, metadata, inits);
    }

    public QMessage(Class<? extends Message> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.from = inits.isInitialized("from") ? new com.example.backend.entity.mariaDB.member.QMember(forProperty("from")) : null;
        this.status = inits.isInitialized("status") ? new com.example.backend.entity.mariaDB.status.QStatus(forProperty("status"), inits.get("status")) : null;
    }

}

