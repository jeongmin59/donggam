package com.example.backend.dto.landmark;

import com.example.backend.entity.mariaDB.space.LandMark;
import com.example.backend.entity.postgreSQL.LandMarkLocation;
import lombok.Builder;
import lombok.Data;

@Data
public class SearchLandmarkDto {

    @Data
    public static class Request {
        private Double latitude;
        private Double longitude;
    }

    @Data
    @Builder
    public static class Response {
        private Long landMarkId;
        private String imgUrl;
        private Double latitude;
        private Double longitude;
        private String name;
    }
}
