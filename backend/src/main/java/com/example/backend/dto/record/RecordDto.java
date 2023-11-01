package com.example.backend.dto.record;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class RecordDto {

    @NoArgsConstructor
    @AllArgsConstructor
    @Data
    @Builder
    public static class Response {
        private Long recordId;
        private Long title;
    }
}
