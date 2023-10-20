package com.example.backend.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Member {

    @Id
    private String id;

    private String nickname;

    @Builder
    private Member(String id, String nickname) {
        this.id = id;
        this.nickname = nickname;
    }
}
