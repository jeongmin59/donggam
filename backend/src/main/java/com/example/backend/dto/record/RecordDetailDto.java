package com.example.backend.dto.record;

import com.example.backend.entity.mariaDB.space.Record;
import com.example.backend.entity.postgreSQL.RecordLocation;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class RecordDetailDto {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {
        private String title;
        private String content;
        private Double latitude;
        private Double longitude;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {
        private String title;
        private String content;
        private String imageAddress;
        private Long authorId;
        private LocalDateTime createdAt;
        private Double latitude;
        private Double longitude;
        private List<RecordCommentDto.Response> comments;
    }

    public static Response toDetailDto(Record record, RecordLocation recordLocation) {
        return Response.builder()
                .title(record.getTitle())
                .content(record.getContent())
                .imageAddress(record.getImageAddress())
                .authorId(record.getMember().getId())
                .createdAt(record.getCreatedAt())
                .latitude(recordLocation.getLatitude())
                .longitude(recordLocation.getLongitude())
                .comments(record.getComments() != null ? record.getComments().stream().map(RecordCommentDto::toCommentDto)
                        .collect(Collectors.toList()) : null)
                .build();
    }
}
