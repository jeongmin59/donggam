package com.example.backend.entity.mariaDB.chat;

import com.example.backend.entity.mariaDB.member.Member;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class Chatting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member from;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member to;

    @ManyToOne(fetch = FetchType.LAZY)
    private ChattingRoom chattingRoom;

    @Builder
    public Chatting(Member from, Member to, ChattingRoom chattingRoom) {
        this.from = from;
        this.to = to;
        this.chattingRoom = chattingRoom;
    }
}
