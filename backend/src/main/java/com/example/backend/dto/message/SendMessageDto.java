package com.example.backend.dto.message;

import com.example.backend.entity.mariaDB.member.Member;
import com.example.backend.entity.mariaDB.message.Message;
import com.example.backend.entity.mariaDB.status.Status;
import lombok.Builder;
import lombok.Data;

@Data
public class SendMessageDto {

    @Data
    public static class Request {
        private Long statusId;
        private String content;

        public Message toMessageEnitty(Member from, String imageAddress, Status status) {
            return Message.builder()
                    .isRead(false)
                    .isLiked(false)
                    .from(from)
                    .status(status)
                    .imgAddress(imageAddress)
                    .content(this.content)
                    .build();
        }
    }

    @Data
    @Builder
    public static class Response {
        private String content;
    }
}
