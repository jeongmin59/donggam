package com.example.backend.dto.landmark;

import com.example.backend.entity.mariaDB.member.Member;
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
  }
}
