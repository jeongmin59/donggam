package com.example.backend.repository.postgreSQL;

import com.example.backend.entity.postgreSQL.LandMarkLocation;
import com.example.backend.entity.postgreSQL.MemberLocation;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LandMarkLocationRepository extends JpaRepository<LandMarkLocation, Long> {

    @Query(value = "SELECT l FROM LandMarkLocation l WHERE " +
            "ST_DWithin(ST_MakePoint(:longitude, :latitude), " +
            "ST_MakePoint(l.longitude, l.latitude), :radius / 111300.0) = true " +
            "ORDER BY ST_Distance(ST_MakePoint(:longitude, :latitude), ST_MakePoint(l.longitude, l.latitude)) ASC")
    Optional<LandMarkLocation> findNearestWithinRadius(@Param("latitude") Double latitude, @Param("longitude") Double longitude, @Param("radius") Double radius);
}
