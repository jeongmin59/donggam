package com.example.backend.entity.mariaDB;

import javax.persistence.Column;
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
    private String id;

    @Column
    private String nickname;

    @Column
    private Integer characterId;

    @Column
    private Long pointId;

    @Builder
    private Member(String id, String nickname, Integer characterId){
        this.id = id;
        this.nickname = nickname;
        this.characterId = characterId;
    }

    private void setPointId(Long pointId) {
        this.pointId = pointId;
    }
}

