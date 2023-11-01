package com.example.backend.dto;

import com.example.backend.entity.mariaDB.member.Authority;
import com.example.backend.entity.mariaDB.member.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginDto {

  private Long id;
  private String email;

  public Member toMember() {
    return Member.builder()
        .id(id)
        .email(email)
        .authority(Authority.ROLE_USER)
        .build();
  }

  public UsernamePasswordAuthenticationToken toAuthentication() {
    return new UsernamePasswordAuthenticationToken(id, email);
  }

  @Builder
  @NoArgsConstructor
  @AllArgsConstructor
  @Data
  public static class Response {
    private Long memberId;
    private String nickname;
    private Long statusId;
    private String status;
    private Integer characterId;
    private String grantType;
    private String accessToken;
    private Long accessTokenExpiration;
  }
}
