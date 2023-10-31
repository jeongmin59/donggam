package com.example.backend.repository.mariaDB.chat;

import com.example.backend.entity.mariaDB.chat.Chat;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat, Long> {

    List<Chat> findAllByChatRoomId(Long chatRoomId);
}
