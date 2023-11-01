package com.example.backend.dto.chat;

import com.example.backend.type.MessageType;
import lombok.Builder;
import lombok.Data;

@Data
public class SendChatMessageDto {

    @Data
    public static class Request {
        private MessageType type;
        private Long roomId;
        private String sender;
        private Long senderId;
        private String content;

        public Response toResponse() {
            return Response.builder()
                    .type(this.type)
                    .roomId(this.roomId)
                    .sender(this.sender)
                    .senderId(this.senderId)
                    .content(this.content)
                    .build();
        }
    }

    @Data
    @Builder
    public static class Response {
        private MessageType type;
        private Long roomId;
        private String sender;
        private Long senderId;
        private String content;
    }
}
