package com.example.backend.entity.mariaDB.time;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QImage is a Querydsl query type for Image
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QImage extends EntityPathBase<Image> {

    private static final long serialVersionUID = -1890472844L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QImage image = new QImage("image");

    public final com.example.backend.entity.mariaDB.member.QMember author;

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath imageAddress = createString("imageAddress");

    public final BooleanPath isActive = createBoolean("isActive");

    public final ListPath<com.example.backend.entity.mariaDB.member.Member, com.example.backend.entity.mariaDB.member.QMember> likeMember = this.<com.example.backend.entity.mariaDB.member.Member, com.example.backend.entity.mariaDB.member.QMember>createList("likeMember", com.example.backend.entity.mariaDB.member.Member.class, com.example.backend.entity.mariaDB.member.QMember.class, PathInits.DIRECT2);

    public final StringPath title = createString("title");

    public QImage(String variable) {
        this(Image.class, forVariable(variable), INITS);
    }

    public QImage(Path<? extends Image> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QImage(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QImage(PathMetadata metadata, PathInits inits) {
        this(Image.class, metadata, inits);
    }

    public QImage(Class<? extends Image> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.author = inits.isInitialized("author") ? new com.example.backend.entity.mariaDB.member.QMember(forProperty("author")) : null;
    }

}

