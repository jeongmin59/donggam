package com.example.backend.repository.mariaDB;

import com.example.backend.entity.mariaDB.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status, Long> {

}
