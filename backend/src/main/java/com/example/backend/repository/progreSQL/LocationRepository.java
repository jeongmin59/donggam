package com.example.backend.repository.progreSQL;

import com.example.backend.entity.progreSQL.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {

}
