package com.example.backend.entity.mariaDB.chat;

import com.example.backend.dto.chat.RoomDto;
import com.example.backend.entity.mariaDB.member.Member;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Member member1;

    @ManyToOne
    private Member member2;

    @Builder
    public ChatRoom(Member member1, Member member2) {
        this.member1 = member1;
        this.member2 = member2;
    }

    public RoomDto toRoomDto(Member member) {
        String name = "";
        if(member.getId() == this.member1.getId()) {
            name = member2.getNickname();
        }
        else name = member1.getNickname();

        return RoomDto.builder()
                .name(name)
                .roomId(this.id)
                .build();
    }
}
