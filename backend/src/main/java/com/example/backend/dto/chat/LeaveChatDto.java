package com.example.backend.dto.chat;

import lombok.Data;

@Data
public class LeaveChatDto {

    @Data
    public static class Request {
        private Long roomId;
    }
}
