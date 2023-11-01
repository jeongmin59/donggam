package com.example.backend.repository.mariaDB.landmark;

import com.example.backend.entity.mariaDB.space.LandMark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LandMarkRepository extends JpaRepository<LandMark, Long> {

}
