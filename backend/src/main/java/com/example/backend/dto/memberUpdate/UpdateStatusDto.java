package com.example.backend.dto.memberUpdate;

import com.example.backend.entity.mariaDB.Emotion;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class UpdateStatusDto {

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public static class Request {
    private String status;
  }

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  @Builder
  public static class Response {
    private String status;
    private Emotion emotion;
  }
}
