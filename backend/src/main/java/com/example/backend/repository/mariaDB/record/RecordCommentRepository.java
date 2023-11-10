package com.example.backend.repository.mariaDB.record;

import com.example.backend.entity.mariaDB.space.RecordComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordCommentRepository extends JpaRepository<RecordComment, Long> {

}
