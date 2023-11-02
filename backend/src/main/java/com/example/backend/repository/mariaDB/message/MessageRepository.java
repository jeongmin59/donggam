package com.example.backend.repository.mariaDB.message;

import com.example.backend.entity.mariaDB.message.Message;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {

    Message findByStatusId(Long lastStatusId);

    List<Message> findAllByStatusId(Long statusId);
}
