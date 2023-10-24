package com.example.backend.entity.mariaDB;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 카카오에서 받아올 닉네임
    @Column
    private String nickname;

    // 카카오에서 받아올 이메일
    @Column
    private String email;

    // 프로필 캐릭터 id
    @Column
    private Integer characterId;

    // 위치
    @Column
    private Long pointId;

    @Builder
    private Member(Long id, String nickname, String email, Integer characterId){
        this.id = id;
        this.nickname = nickname;
        this.email = email;
        this.characterId = characterId;
    }

    private void setPointId(Long pointId) {
        this.pointId = pointId;
    }
}

