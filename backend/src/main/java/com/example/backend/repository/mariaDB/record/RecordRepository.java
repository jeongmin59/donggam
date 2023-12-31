package com.example.backend.repository.mariaDB.record;

import com.example.backend.entity.mariaDB.space.Record;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {

    List<Record> findByIdIn(List<Long> recordIds);
}
