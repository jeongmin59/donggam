package com.example.backend.dto.chat;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

@Data
public class ChatRoomDto {

    @Data
    @Builder
    public static class Response {
        private Long roomId;
        private String name;
        private Boolean isActive;
        private Integer unReadChatCount;
        private LocalDateTime lastChatTime;
    }

}
