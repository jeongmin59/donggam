package com.example.backend.repository.mariaDB.landmark;

import com.example.backend.entity.mariaDB.space.LandMarkRecordComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LandMarkRecordCommentRepository extends JpaRepository<LandMarkRecordComment, Long> {

}
