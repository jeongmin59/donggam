package com.example.backend.repository.postgreSQL;

import com.example.backend.entity.postgreSQL.MemberLocation;
import com.example.backend.entity.postgreSQL.RecordLocation;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordLocationRepository extends JpaRepository<RecordLocation, Long> {

    @Query(value = "SELECT l FROM RecordLocation l WHERE " +
            "ST_DWithin(ST_MakePoint(:longitude, :latitude), " +
            "ST_MakePoint(l.longitude, l.latitude), :radius / 111300.0) = true")
    List<RecordLocation> findWithinRadius(@Param("latitude") Double latitude, @Param("longitude") Double longitude, @Param("radius") Double radius);
}
