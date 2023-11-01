package com.example.backend.dto.message;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MessageDto {
    private Long messageId;
    private String content;
    private Long senderId;
    private String sender;
    private Boolean isLiked;
    private Boolean isRead;
}
