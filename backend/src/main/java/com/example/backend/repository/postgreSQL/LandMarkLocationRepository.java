package com.example.backend.repository.postgreSQL;

import com.example.backend.entity.postgreSQL.LandMarkLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LandMarkLocationRepository extends JpaRepository<LandMarkLocation, Long> {

}
