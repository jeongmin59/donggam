package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class LocationDto {

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public static class Request{
    private Double latitude;
    private Double longitude;
  }
}
