package com.example.backend.dto.chat;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RoomDto {
    private String name;
    private Long roomId;
}
