package com.example.backend.dto.landmark;

import com.example.backend.entity.mariaDB.space.LandMarkRecordComment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class LandMarkCommentDto {

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  @Builder
  public static class Response {
    private String content;
    private Long commentAuthorId;
  }

  public static Response toCommentDto(LandMarkRecordComment comment) {
    return Response.builder().content(comment.getContent()).commentAuthorId(comment.getMember().getId()).build();
  }
}
