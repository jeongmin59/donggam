package com.example.backend.dto.chat;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
public class GetRoomListDto {

    @Data
    @Builder
    public static class Response {
        private List<RoomDto> roomList;
    }
}
