package com.example.backend.dto.memberUpdate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class UpdateNicknameDto {

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public static class Request {
    private String nickname;
  }

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  @Builder
  public static class Response {
    private String nickname;
  }

}
