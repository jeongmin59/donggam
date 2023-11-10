package com.example.backend.entity.mariaDB.chat;

import com.example.backend.entity.mariaDB.member.Member;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Entity
@Setter
@NoArgsConstructor
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Member member1;

    @ManyToOne
    private Member member2;

    @Column
    private Boolean isMember1Active;

    @Column
    private Boolean isMember2Active;

    @Column
    private LocalDateTime lastChatTime;

    @OneToMany(mappedBy = "chatRoom", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Chat> chat;

    @Builder
    public ChatRoom(Member member1, Member member2, Boolean isMember1Active, Boolean isMember2Active) {
        this.member1 = member1;
        this.member2 = member2;
        this.isMember1Active = isMember1Active;
        this.isMember2Active = isMember2Active;
    }
}
