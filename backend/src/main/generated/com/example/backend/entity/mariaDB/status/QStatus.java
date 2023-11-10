package com.example.backend.entity.mariaDB.status;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStatus is a Querydsl query type for Status
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStatus extends EntityPathBase<Status> {

    private static final long serialVersionUID = -79774284L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStatus status = new QStatus("status");

    public final StringPath content = createString("content");

    public final EnumPath<com.example.backend.type.Emotion> emotion = createEnum("emotion", com.example.backend.type.Emotion.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.example.backend.entity.mariaDB.member.QMember member;

    public final ListPath<com.example.backend.entity.mariaDB.message.Message, com.example.backend.entity.mariaDB.message.QMessage> message = this.<com.example.backend.entity.mariaDB.message.Message, com.example.backend.entity.mariaDB.message.QMessage>createList("message", com.example.backend.entity.mariaDB.message.Message.class, com.example.backend.entity.mariaDB.message.QMessage.class, PathInits.DIRECT2);

    public QStatus(String variable) {
        this(Status.class, forVariable(variable), INITS);
    }

    public QStatus(Path<? extends Status> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStatus(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStatus(PathMetadata metadata, PathInits inits) {
        this(Status.class, metadata, inits);
    }

    public QStatus(Class<? extends Status> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.example.backend.entity.mariaDB.member.QMember(forProperty("member")) : null;
    }

}

