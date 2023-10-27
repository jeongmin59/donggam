package com.example.backend.repository.mariaDB;

import com.example.backend.entity.mariaDB.time.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {

}
