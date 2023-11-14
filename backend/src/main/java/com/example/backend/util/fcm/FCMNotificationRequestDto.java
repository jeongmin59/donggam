package com.example.backend.util.fcm;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FCMNotificationRequestDto {

    private Long memberId;
    private String title;
    private String body;

    @Builder
    public FCMNotificationRequestDto(Long memberId, String title, String body) {
        this.memberId = memberId;
        this.title = title;
        this.body = body;
    }
}
