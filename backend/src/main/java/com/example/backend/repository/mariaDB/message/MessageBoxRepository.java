package com.example.backend.repository.mariaDB.message;

import com.example.backend.entity.mariaDB.message.MessageBox;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageBoxRepository extends JpaRepository<MessageBox, Long> {

}
