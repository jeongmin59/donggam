package com.example.backend.repository.mariaDB.chat;

import com.example.backend.entity.mariaDB.chat.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

}
