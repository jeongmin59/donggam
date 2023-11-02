package com.example.backend.repository.mariaDB.image;

import com.example.backend.entity.mariaDB.time.Image;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ImageRepository extends JpaRepository<Image, Long> {

  List<Image> findAllByIsActive(Boolean isActive);

  List<Image> findAllByIsActiveFalse();
}
