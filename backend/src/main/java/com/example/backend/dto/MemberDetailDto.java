package com.example.backend.dto;

import com.example.backend.entity.mariaDB.member.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class MemberDetailDto {

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  @Builder
  public static class Response {
    private String nickname;
    private Integer characterId;
    private Long statusId;
    private String status;
  }

  public static Response toDto(Member member) {
    return Response.builder()
            .nickname(member.getNickname())
            .characterId(member.getCharacterId())
            .statusId(member.getStatus().get(member.getStatus().size() - 1).getId())
            .status(member.getStatus().get(member.getStatus().size() - 1).getContent())
            .build();
  }
}
