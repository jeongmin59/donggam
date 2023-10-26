package com.example.backend.dto.memberUpdate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class UpdateCharacterDto {

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public static class Request {
    private Integer characterId;
  }

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  @Builder
  public static class Response {
    private Integer characterId;
  }
}
