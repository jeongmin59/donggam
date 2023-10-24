package com.example.backend.entity.mariaDB;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "status_id")
    private Status status;

    @Builder
    private Member(String id, String nickname, Integer characterId){
        this.id = id;
        this.nickname = nickname;
        this.characterId = characterId;
    }

    private void setPointId(Long pointId) {
        this.pointId = pointId;
    }

    private void setStatus(Status status) {
        this.status = status;
    }
}

