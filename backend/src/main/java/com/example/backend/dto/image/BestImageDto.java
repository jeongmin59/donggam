package com.example.backend.dto.image;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
public class BestImageDto {

    @Data
    @Builder
    public static class Response {
        private Integer totalParticipants;
        private List<ImageDto.Response> bestImages;
    }

}
