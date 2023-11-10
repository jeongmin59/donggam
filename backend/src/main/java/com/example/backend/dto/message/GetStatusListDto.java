package com.example.backend.dto.message;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
public class GetStatusListDto {

    @Data
    @Builder
    public static class Response {
        private List<StatusDto> statusList;
    }
}
