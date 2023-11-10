package com.example.backend.entity.mariaDB.space;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QLandMark is a Querydsl query type for LandMark
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLandMark extends EntityPathBase<LandMark> {

    private static final long serialVersionUID = -1691766790L;

    public static final QLandMark landMark = new QLandMark("landMark");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath imageAddress = createString("imageAddress");

    public final StringPath name = createString("name");

    public final ListPath<LandMarkRecord, QLandMarkRecord> records = this.<LandMarkRecord, QLandMarkRecord>createList("records", LandMarkRecord.class, QLandMarkRecord.class, PathInits.DIRECT2);

    public QLandMark(String variable) {
        super(LandMark.class, forVariable(variable));
    }

    public QLandMark(Path<? extends LandMark> path) {
        super(path.getType(), path.getMetadata());
    }

    public QLandMark(PathMetadata metadata) {
        super(LandMark.class, metadata);
    }

}

