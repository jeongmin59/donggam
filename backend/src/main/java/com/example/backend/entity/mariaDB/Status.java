package com.example.backend.entity.mariaDB;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "status")
@Getter
public class Status {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private String content;

  @Column
  private Emotion emotion;

  @Builder
  private Status(String content, String emotion) {
    this.content = content;
    this.emotion = Emotion.StringToEnum(emotion);
  }

  public static Status toStatus(String content, String emotion) {
    return new Status(content, emotion);
  }
}
