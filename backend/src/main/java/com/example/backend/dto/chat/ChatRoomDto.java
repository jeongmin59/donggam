package com.example.backend.dto.chat;

import com.example.backend.entity.mariaDB.chat.Chat;
import com.example.backend.entity.mariaDB.chat.ChatRoom;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import lombok.Builder;
import lombok.Data;
import org.w3c.dom.stylesheets.LinkStyle;

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
        private String lastChat;
        private LocalDateTime lastChatTime;
    }

    public static Response toDto(ChatRoom room, Long memberId, Boolean isActive) {
        List<Chat> chats = room.getChat();

        Chat lastChat = chats.stream().
                max(Comparator.comparing(Chat::getCreatedAt))
                .orElse(null);

        return Response.builder()
                .roomId(room.getId())
                .name(Objects.equals(room.getMember1().getId(), memberId)
                        ? room.getMember2().getNickname() : room.getMember1().getNickname())
                .characterId(Objects.equals(room.getMember1().getId(), memberId)
                        ? room.getMember2().getCharacterId() : room.getMember1().getCharacterId())
                .isActive(isActive)
                .unReadChatCount((int) room.getChat().stream().filter(chat ->
                        !Objects.equals(chat.getSender().getId(), memberId) && !chat.getIsRead()).count())
                .lastChatTime(lastChat != null ? lastChat.getCreatedAt() : null)
                .lastChat(lastChat != null ? lastChat.getContent() : null)
                .build();
    }

}
