package com.example.backend.entity.mariaDB.time;

import com.example.backend.entity.mariaDB.member.Member;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Image {

  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private String imageAddress;

  @Column
  private String title;

  @Column
  private LocalDateTime createdAt;

  // 사진 업로드 한 멤버
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "author_id")
  private Member author;

  // 삭제 되었는지 유무
  @Column
  private Boolean isActive;

  // 사진을 좋아요 한 회원
  @ManyToMany
  @JoinTable(name = "image_like",
      joinColumns = @JoinColumn(name = "image_id"),
      inverseJoinColumns = @JoinColumn(name = "member_id"))
  private List<Member> likeMember;

  @Builder
  public Image(String imageAddress, String title, LocalDateTime createdAt, Member author, Boolean isActive) {
    this.imageAddress = imageAddress;
    this.title = title;
    this.createdAt = createdAt;
    this.author = author;
    this.isActive = isActive;
  }

}
