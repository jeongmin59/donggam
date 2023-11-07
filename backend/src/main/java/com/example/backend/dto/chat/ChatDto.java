package com.example.backend.dto.chat;

import com.example.backend.entity.mariaDB.chat.Chat;
import com.example.backend.entity.mariaDB.chat.ChatRoom;
import com.example.backend.entity.mariaDB.member.Member;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatDto {

    @Data
    @Builder
    public static class Response {
        private Long chatId;
        private String content;
        private String sender;
        private Long senderId;
        private LocalDateTime createdAt;
        private Boolean isRead;
    }

    public static Response toDto(Chat chat) {
        return Response.builder()
                .chatId(chat.getId())
                .content(chat.getContent())
                .sender(chat.getSender().getNickname())
                .senderId(chat.getSender().getId())
                .isRead(chat.getIsRead())
                .createdAt(chat.getCreatedAt())
                .build();
    }
}
