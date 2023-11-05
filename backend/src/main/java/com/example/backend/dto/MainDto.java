package com.example.backend.dto;

import com.example.backend.type.Emotion;
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
    private Integer unreadMessageCount;
    private Integer unreadChatCount;
    private Emotion statusWeather;
    private Integer aroundPeopleCount;
    private List<AroundDto.Response> aroundPeople;
  }
}
