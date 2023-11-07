package com.example.backend.dto.record;

import com.example.backend.entity.mariaDB.space.Record;
import com.example.backend.entity.postgreSQL.RecordLocation;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

@Data
public class MyRecordDto {

    @Data
    @Builder
    public static class Response {
        private Long recordId;
        private String title;
        private String imageAddress;
        private LocalDateTime createdAt;
        private Double latitude;
        private Double longitude;
    }

    public static Response toDto(Record record, RecordLocation recordLocation) {


        return Response.builder()
                .recordId(record.getId())
                .title(record.getTitle())
                .imageAddress(record.getImageAddress())
                .createdAt(record.getCreatedAt())
                .latitude(recordLocation.getLatitude())
                .longitude(recordLocation.getLongitude())
                .build();
    }

}
