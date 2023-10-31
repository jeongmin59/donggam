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

    @ManyToOne
    private Member from;

    @ManyToOne
    private Member to;

    @ManyToOne
    private Status status;

    @Builder
    public Message(String content, String imgAddress, Member from, Member to,
            Status status) {
        this.content = content;
        this.imgAddress = imgAddress;
        this.from = from;
        this.to = to;
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

    public MessageDto toMessageDto(Status status) {
        return MessageDto.builder()
                .statusId(status.getId())
                .status(status.getContent())
                .messageId(this.id)
                .content(this.content)
                .build();
    }

    public MessageDto toMessageDtos() {
        return MessageDto.builder()
                .messageId(this.id)
                .content(this.content)
                .build();
    }
}
