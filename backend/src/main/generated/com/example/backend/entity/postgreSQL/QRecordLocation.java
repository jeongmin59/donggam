package com.example.backend.entity.postgreSQL;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QRecordLocation is a Querydsl query type for RecordLocation
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRecordLocation extends EntityPathBase<RecordLocation> {

    private static final long serialVersionUID = -1467198496L;

    public static final QRecordLocation recordLocation = new QRecordLocation("recordLocation");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Double> latitude = createNumber("latitude", Double.class);

    public final NumberPath<Double> longitude = createNumber("longitude", Double.class);

    public QRecordLocation(String variable) {
        super(RecordLocation.class, forVariable(variable));
    }

    public QRecordLocation(Path<? extends RecordLocation> path) {
        super(path.getType(), path.getMetadata());
    }

    public QRecordLocation(PathMetadata metadata) {
        super(RecordLocation.class, metadata);
    }

}

