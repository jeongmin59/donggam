package com.example.backend.repository.postgreSQL;

import com.example.backend.entity.postgreSQL.RecordLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordLocationRepository extends JpaRepository<RecordLocation, Long> {

}
