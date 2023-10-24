package com.example.backend.entity.mariaDB;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "member")
@Getter
public class Member {
  @Id
  private String id;

  @Column
  private String nickname;

  @Column
  private Integer characterId;

  @Column
  private Long pointId;

  @Builder
  private Member(String id, String nickname){
    this.id = id;
    this.nickname = nickname;
  }

  private void setPointId(Long pointId) {
    this.pointId = pointId;
  }
}
