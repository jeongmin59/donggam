package com.example.backend.repository.mariaDB;

import com.example.backend.entity.mariaDB.time.Image;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ImageRepository extends JpaRepository<Image, Long> {

  @Query("SELECT DISTINCT i FROM Image i LEFT JOIN FETCH i.author LEFT JOIN FETCH i.likeMember")
  List<Image> findAllWithAuthorAndLikeMemberByIsActive(Boolean isActive);

  @Query("SELECT i FROM Image i LEFT JOIN FETCH i.author LEFT JOIN FETCH i.likeMember WHERE i.id = ?1")
  Image findWithAuthorAndLikeMemberByIdAndIsActive(Long imageId, Boolean isActive);

  @Query("SELECT i FROM Image i ORDER BY COALESCE(SIZE(i.likeMember), 0) DESC")
  List<Image> findTop3ByOrderByLikeMemberDescAndIsActive(Boolean isActive);

  List<Image> findAllByIsActive(Boolean isActive);

  List<Image> findAllByIsActiveFalse();
}
