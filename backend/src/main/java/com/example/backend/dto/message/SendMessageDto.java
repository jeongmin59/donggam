package com.example.backend.dto.message;

import com.example.backend.entity.mariaDB.member.Member;
import com.example.backend.entity.mariaDB.message.Message;
import com.example.backend.entity.mariaDB.message.MessageBox;
import lombok.Builder;
import lombok.Data;
import lombok.Setter;

@Data
public class SendMessageDto {

    @Data
    public static class Request {
        private Long memberId;
        private Long messageBoxId;
        private String content;

        public Message toMessageEnitty(Member from, Member to, String imageAddress) {
            return Message.builder()
                    .from(from)
                    .to(to)
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
