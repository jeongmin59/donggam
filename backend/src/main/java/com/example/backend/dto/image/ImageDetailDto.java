package com.example.backend.dto.image;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class ImageDetailDto {

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  @Builder
  public static class Response {
    private Long authorId;
    private Integer authorCharacterId;
    private String imageAddress;
    private String title;
    private Integer likeCount;
  }
}
