package com.example.backend.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class MainDto {

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public static class Request {
    private Long memberId;
    private Double latitude;
    private Double longitude;
  }

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  @Builder
  public static class Response {
    private String nickname;
    private String status;
    private Integer characterId;
    private Integer aroundPeopleCount;
    private List<AroundDto.Response> aroundPeople;
  }

  public static Response toMainDtoResponse (String nickname, String status, Integer characterId, Integer aroundPeopleCount, List<AroundDto.Response> aroundPeople) {
    return new Response(nickname, status, characterId, aroundPeopleCount, aroundPeople);
  }
}
