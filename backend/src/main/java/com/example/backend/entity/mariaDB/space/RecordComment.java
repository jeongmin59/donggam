package com.example.backend.entity.mariaDB.space;

import com.example.backend.entity.mariaDB.member.Member;
import java.time.LocalDate;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "record_comment")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RecordComment {

  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private String content;

  @Column
  private LocalDateTime createdAt;

  // 댓글 작성자
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "member_id")
  private Member member;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "record_id")
  private Record record;

  @Builder
  public RecordComment(String content, LocalDateTime createdAt, Member member, Record record) {
    this.content = content;
    this.createdAt = createdAt;
    this.member = member;
    this.record = record;
  }
}
