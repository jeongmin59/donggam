package com.example.backend.repository.mariaDB.image;

import com.example.backend.entity.mariaDB.time.Image;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ImageRepository extends JpaRepository<Image, Long> {

  @Query("SELECT i FROM Image i WHERE i.isActive = true")
  List<Image> findByIsActiveTrue();

  List<Image> findAllByIsActiveFalse();
}
