package com.example.backend.entity.mariaDB.member;

import com.example.backend.entity.mariaDB.status.Status;
import com.example.backend.entity.mariaDB.time.Image;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.Setter;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "member")
@Getter
@Setter
public class Member {
    @Id
    private Long id;

    // 랜덤으로 지정할 닉네임
    @Column
    private String nickname;

    // 카카오에서 받아올 이메일
    @Column
    private String email;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    // 프로필 캐릭터 id
    @Column
    private Integer characterId;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Status> status;

    @ManyToMany(mappedBy = "likeMember")
    private List<Image> likedImages;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "author", cascade = CascadeType.REMOVE)
    private List<Image> myImages;

    @Builder
    public Member(Long id, String nickname, String email, Integer characterId, Authority authority){
        this.id = id;
        this.nickname = nickname;
        this.email = email;
        this.characterId = characterId;
        this.authority = authority;
    }
}

