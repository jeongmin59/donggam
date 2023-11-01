package com.example.backend.dto.landmark;

import com.example.backend.entity.mariaDB.member.Member;
import com.example.backend.entity.mariaDB.space.LandMarkRecord;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class LandMarkRecordDto {

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  @Builder
  public static class Response {
    private Long recordId;
    private String content;
    private String imageAddress;
    private Long authorId;
    private LocalDateTime createdAt;
    private List<LandMarkCommentDto.Response> comments;
  }

  public static Response toRecordDto(LandMarkRecord record) {
    return Response.builder()
        .recordId(record.getId())
        .content(record.getContent())
        .imageAddress(record.getImageAddress())
        .authorId(record.getMember().getId())
        .createdAt(record.getCreatedAt())
        .comments(record.getComments() != null ? record.getComments().stream().map(LandMarkCommentDto::toCommentDto)
            .collect(Collectors.toList()) : Collections.emptyList())
        .build();
  }
}
