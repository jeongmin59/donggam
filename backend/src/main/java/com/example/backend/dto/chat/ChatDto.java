package com.example.backend.dto.chat;

import com.example.backend.entity.mariaDB.chat.ChatRoom;
import com.example.backend.entity.mariaDB.member.Member;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatDto {

    private Long id;
    private String content;
    private String sender;
    private Boolean isRead;
}
