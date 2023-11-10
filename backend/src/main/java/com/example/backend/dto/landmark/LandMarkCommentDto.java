package com.example.backend.dto.landmark;

import com.example.backend.entity.mariaDB.space.LandMarkRecordComment;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class LandMarkCommentDto {

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
    private Long commentAuthorId;
    private LocalDateTime createdAt;
  }

  public static Response toCommentDto(LandMarkRecordComment comment) {
    return Response.builder()
        .commentId(comment.getId())
        .content(comment.getContent())
        .commentAuthorId(comment.getMember().getId())
        .createdAt(comment.getCreatedAt())
        .build();
  }
}
