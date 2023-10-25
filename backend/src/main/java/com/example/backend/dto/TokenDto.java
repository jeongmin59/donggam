package com.example.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TokenDto {
  private String grantType;
  private String accessToken;
  private Long accessTokenExpiration;
}
