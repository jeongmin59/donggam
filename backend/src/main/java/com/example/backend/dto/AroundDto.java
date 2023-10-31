package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class AroundDto {

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  @Builder
  public static class Response {
    private Long memberId;
    private Integer characterId;
  }

  public static Response toAroundDtoResponse(Long memberId, Integer characterId) {
    return new Response(memberId, characterId);
  }
}
