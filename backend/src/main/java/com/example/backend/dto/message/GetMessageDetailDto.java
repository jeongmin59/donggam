package com.example.backend.dto.message;

import java.time.LocalDate;
import lombok.Builder;
import lombok.Data;

@Data
public class GetMessageDetailDto {

    @Data
    @Builder
    public static class Response {
        private Long id;
        private String content;
        private String imgAddress;
        private LocalDate localDate = LocalDate.now();
        private String from;
        private Boolean isLiked;
        private Boolean isRead;
    }
}
