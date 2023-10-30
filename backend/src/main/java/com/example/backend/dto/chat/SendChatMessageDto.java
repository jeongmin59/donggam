package com.example.backend.dto.chat;

import com.example.backend.type.MessageType;
import lombok.Data;

@Data
public class SendChatMessageDto {

    @Data
    public static class Request {
        private MessageType type;
        private Long RoomId;
        private String sender;
        private Long senderId;
        private String content;
    }

    @Data
    public static class Response {
        private MessageType type;
        private Long roomId;
        private String sender;
        private Long senderId;
        private String content;

        public Response(Request request) {
            this.type = request.getType();
            this.roomId = request.getRoomId();
            this.sender = request.getSender();
            this.senderId = request.getSenderId();
            this.content = request.getContent();
        }
    }
}
