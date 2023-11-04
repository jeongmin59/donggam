package com.example.backend.dto.chat;

import lombok.Builder;
import lombok.Data;

@Data
public class InviteChatDto {

    @Data
    public static class Request {
        Long memberId;
    }

    @Data
    @Builder
    public static class Response {
        Long roomId;
    }
}
