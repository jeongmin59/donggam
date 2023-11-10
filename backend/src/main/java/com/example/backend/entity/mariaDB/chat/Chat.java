package com.example.backend.entity.mariaDB.chat;

import com.example.backend.dto.chat.ChatDto;
import com.example.backend.entity.mariaDB.member.Member;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Entity
@Setter
@NoArgsConstructor
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String content;

    @Column
    private LocalDateTime createdAt;

    @Column
    private Boolean isRead;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id")
    private Member sender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoom;

    @Builder
    public Chat(String content, Member sender, ChatRoom chatRoom, LocalDateTime createdAt, Boolean isRead) {
        this.content = content;
        this.sender = sender;
        this.chatRoom = chatRoom;
        this.createdAt = createdAt;
        this.isRead = isRead;
    }
}
