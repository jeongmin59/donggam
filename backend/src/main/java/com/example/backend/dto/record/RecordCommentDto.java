package com.example.backend.dto.record;

import com.example.backend.entity.mariaDB.space.RecordComment;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class RecordCommentDto {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {
        private String content;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {
        private Long commentId;
        private String content;
        private LocalDateTime createdAt;
        private Long commentAuthorId;
    }

    public static Response toCommentDto(RecordComment comment) {
        return Response.builder()
                .commentId(comment.getId())
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .commentAuthorId(comment.getMember().getId())
                .build();
    }
}
