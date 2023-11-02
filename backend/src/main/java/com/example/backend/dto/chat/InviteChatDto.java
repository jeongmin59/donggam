package com.example.backend.dto.chat;

import lombok.Data;

@Data
public class InviteChatDto {

    @Data
    public static class Request {
        Long memberId;
    }
}
