package com.example.backend.entity.postgreSQL;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QLandMarkLocation is a Querydsl query type for LandMarkLocation
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLandMarkLocation extends EntityPathBase<LandMarkLocation> {

    private static final long serialVersionUID = 54118759L;

    public static final QLandMarkLocation landMarkLocation = new QLandMarkLocation("landMarkLocation");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Double> latitude = createNumber("latitude", Double.class);

    public final NumberPath<Double> longitude = createNumber("longitude", Double.class);

    public QLandMarkLocation(String variable) {
        super(LandMarkLocation.class, forVariable(variable));
    }

    public QLandMarkLocation(Path<? extends LandMarkLocation> path) {
        super(path.getType(), path.getMetadata());
    }

    public QLandMarkLocation(PathMetadata metadata) {
        super(LandMarkLocation.class, metadata);
    }

}

