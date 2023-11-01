package com.example.backend.dto.chat;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
public class GetChatListDto {

    @Data
    @Builder
    public static class Response {
        List<ChatDto> chatList;
    }
}
