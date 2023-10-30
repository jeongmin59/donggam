package com.example.backend.dto.message;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MessageDto {
    private Long statusId;
    private String status;
    private Long messageId;
    private String content;
}
