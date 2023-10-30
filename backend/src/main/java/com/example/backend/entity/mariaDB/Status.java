package com.example.backend.entity.mariaDB;

import com.example.backend.dto.message.StatusDto;
import com.example.backend.entity.mariaDB.member.Member;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.aspectj.weaver.AjcMemberMaker;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "status")
@Getter
@Setter
public class Status {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private String content;

  @Column
  private Emotion emotion;

  @ManyToOne(fetch = FetchType.LAZY)
  private Member member;

  @Builder
  private Status(String content, String emotion, Member member) {
    this.content = content;
    this.emotion = Emotion.StringToEnum(emotion);
    this.member = member;
  }

  public StatusDto toStatusDto() {
    return StatusDto.builder()
            .status(this.content)
            .id(this.id)
            .build();
  }
}
