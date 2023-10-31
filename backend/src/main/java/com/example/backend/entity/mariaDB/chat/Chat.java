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
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member sender;

    @ManyToOne(fetch = FetchType.LAZY)
    private ChatRoom chatRoom;

    @Builder
    public Chat(String content, Member sender, ChatRoom chatRoom) {
        this.content = content;
        this.sender = sender;
        this.chatRoom = chatRoom;
    }
}
