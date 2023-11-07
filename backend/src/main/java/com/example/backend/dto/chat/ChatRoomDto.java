package com.example.backend.dto.chat;

import com.example.backend.entity.mariaDB.chat.ChatRoom;
import java.time.LocalDateTime;
import java.util.Objects;
import lombok.Builder;
import lombok.Data;

@Data
public class ChatRoomDto {

    @Data
    @Builder
    public static class Response {
        private Long roomId;
        private String name;
        private Integer characterId;
        private Boolean isActive;
        private Integer unReadChatCount;
        private LocalDateTime lastChatTime;
    }

    public static Response toDto(ChatRoom room, Long memberId, Boolean isActive) {
        return Response.builder()
                .roomId(room.getId())
                .name(Objects.equals(room.getMember1().getId(), memberId)
                        ? room.getMember2().getNickname() : room.getMember1().getNickname())
                .characterId(Objects.equals(room.getMember1().getId(), memberId)
                        ? room.getMember2().getCharacterId() : room.getMember1().getCharacterId())
                .isActive(isActive)
                .unReadChatCount((int) room.getChat().stream().filter(chat -> !chat.getIsRead()).count())
                .lastChatTime(room.getLastChatTime())
                .build();
    }

}
