package com.example.backend.dto.image;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class ImageDto {

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  @Builder
  public static class Response {
    private Long imageId;
    private String imageAddress;
    private String title;
    private Boolean isLiked;
  }
}
