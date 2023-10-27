package com.example.backend.repository.mariaDB;

import com.example.backend.entity.mariaDB.time.Image;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ImageRepository extends JpaRepository<Image, Long> {

  @Query("SELECT DISTINCT i FROM Image i LEFT JOIN FETCH i.author LEFT JOIN FETCH i.likeMember")
  List<Image> findAllWithAuthorAndLikeMember();
}
