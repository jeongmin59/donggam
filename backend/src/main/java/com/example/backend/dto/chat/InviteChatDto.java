package com.example.backend.dto.chat;

import com.example.backend.entity.mariaDB.chat.ChatRoom;
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
        private Long roomId;
        private Boolean isActive;
    }

    public static Response toDto(ChatRoom chatRoom) {
        return Response.builder()
                .roomId(chatRoom.getId())
                .isActive(chatRoom.getIsMember1Active() && chatRoom.getIsMember2Active())
                .build();
    }
}
