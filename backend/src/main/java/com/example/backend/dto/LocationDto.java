package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.locationtech.jts.geom.Point;

@Data
public class LocationDto {

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public static class Request{
    private Double latitude;
    private Double longitude;
  }

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  @Builder
  public static class Response{
    private Long id;
    private Double latitude;
    private Double longitude;
  }

}
