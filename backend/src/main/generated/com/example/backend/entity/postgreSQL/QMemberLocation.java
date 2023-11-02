package com.example.backend.entity.postgreSQL;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QMemberLocation is a Querydsl query type for MemberLocation
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemberLocation extends EntityPathBase<MemberLocation> {

    private static final long serialVersionUID = -1332864727L;

    public static final QMemberLocation memberLocation = new QMemberLocation("memberLocation");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Double> latitude = createNumber("latitude", Double.class);

    public final NumberPath<Double> longitude = createNumber("longitude", Double.class);

    public QMemberLocation(String variable) {
        super(MemberLocation.class, forVariable(variable));
    }

    public QMemberLocation(Path<? extends MemberLocation> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMemberLocation(PathMetadata metadata) {
        super(MemberLocation.class, metadata);
    }

}

