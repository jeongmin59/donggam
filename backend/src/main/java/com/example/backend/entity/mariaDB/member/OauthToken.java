package com.example.backend.entity.mariaDB.member;

import lombok.Data;


@Data
public class OauthToken {
  private String accessToken;
  private String tokenType;
  private String refreshToken;
  private int AccessExpiration;
  private int refreshExpiration;
}
