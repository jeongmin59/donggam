package com.example.backend.entity.mariaDB.member;

import com.example.backend.entity.mariaDB.Status;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "member")
@Getter
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

    // 위치
    @Column
    private Long pointId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "status_id")
    private Status status;

    @Builder
    private Member(Long id, String nickname, String email, Integer characterId, Authority authority){
        this.id = id;
        this.nickname = nickname;
        this.email = email;
        this.characterId = characterId;
        this.authority = authority;
    }

    private void setPointId(Long pointId) {
        this.pointId = pointId;
    }

    private void setStatus(Status status) {
        this.status = status;
    }
}

