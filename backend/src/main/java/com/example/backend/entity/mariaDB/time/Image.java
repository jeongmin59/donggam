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
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
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

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "author_id")
  private Member author;

  // 사진 업로드 한 멤버
  @ManyToMany
  @JoinTable(name = "image_like",
      joinColumns = @JoinColumn(name = "image_id"),
      inverseJoinColumns = @JoinColumn(name = "member_id"))
  private List<Member> likeMember;

}
