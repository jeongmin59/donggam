package com.example.backend.dto.message;

import lombok.Data;

@Data
public class LikeMessageDto {

    @Data
    public static class Request {
        private Long messageId;
        private Boolean isLiked;
    }
}
