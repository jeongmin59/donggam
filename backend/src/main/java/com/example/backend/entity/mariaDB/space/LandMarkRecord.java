package com.example.backend.entity.mariaDB.space;

import com.example.backend.entity.mariaDB.member.Member;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LandMarkRecord {

  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private String content;

  @Column
  private String imageAddress;

  @Column
  private LocalDateTime createdAt;

  // 랜드마크와 연결
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "land_mark_id")
  private LandMark landMark;

  // Record 작성자
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "member_id")
  private Member member;

  // 댓글 목록
  @OneToMany(mappedBy = "landMarkRecord", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
  private List<LandMarkRecordComment> comments;

  @Builder
  public LandMarkRecord(String content, String imageAddress, LocalDateTime createdAt, LandMark landMark, Member member) {
    this.content = content;
    this.imageAddress = imageAddress;
    this.createdAt = createdAt;
    this.landMark = landMark;
    this.member = member;
  }
}
