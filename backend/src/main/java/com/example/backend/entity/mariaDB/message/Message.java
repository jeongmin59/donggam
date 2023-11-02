package com.example.backend.entity.mariaDB.message;

import com.example.backend.dto.message.GetMessageDetailDto;
import com.example.backend.dto.message.MessageDto;
import com.example.backend.dto.message.SendMessageDto;
import com.example.backend.entity.mariaDB.status.Status;
import com.example.backend.entity.mariaDB.member.Member;
import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private String content;

    @Column(nullable = true)
    private String imgAddress;

    @Column
    private LocalDate localDate = LocalDate.now();

    @Column
    private Boolean isLiked;

    @Column
    private Boolean isRead;

    @ManyToOne
    private Member from;

    @ManyToOne
    private Status status;

    @Builder
    public Message(String content, String imgAddress, Boolean isLiked, Boolean isRead, Member from,
            Status status) {
        this.content = content;
        this.imgAddress = imgAddress;
        this.isLiked = isLiked;
        this.isRead = isRead;
        this.from = from;
        this.status = status;
    }

    public GetMessageDetailDto.Response toMessageDetailDto() {
        return GetMessageDetailDto.Response.builder()
                .content(this.content)
                .imgAddress(this.imgAddress)
                .from(this.from.getNickname())
                .id(this.id)
                .build();
    }

    public SendMessageDto.Response toSendMessageResponse() {
        return SendMessageDto.Response
                .builder()
                .content(this.content)
                .build();
    }

    public MessageDto toMessageDto() {
        return MessageDto.builder()
                .isLiked(this.isLiked)
                .isRead(this.isRead)
                .senderId(this.from.getId())
                .sender(this.from.getNickname())
                .messageId(this.id)
                .content(this.content)
                .localDate(this.localDate)
                .build();
    }

    public void setLiked(Boolean liked) {
        isLiked = liked;
    }

    public void setRead(Boolean read) {
        isRead = read;
    }
}
