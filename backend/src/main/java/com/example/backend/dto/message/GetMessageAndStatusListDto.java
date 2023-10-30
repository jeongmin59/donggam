package com.example.backend.dto.message;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
public class GetMessageAndStatusListDto {

    @Data
    @Builder
    public static class Response {
        private MessageDto message;
        private List<StatusDto> statusList;
    }
}
