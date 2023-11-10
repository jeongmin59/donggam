package com.example.backend.repository.mariaDB.chat;

import com.example.backend.entity.mariaDB.chat.Chat;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ChatRepository extends JpaRepository<Chat, Long> {

    @Query("SELECT c FROM Chat c WHERE c.chatRoom.id = ?1")
    List<Chat> findAllByChatRoomId(Long chatRoomId);
}
