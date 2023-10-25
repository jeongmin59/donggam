package com.example.backend.repository.postgreSQL;

import com.example.backend.entity.postgreSQL.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {

}
