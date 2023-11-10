package com.example.backend.dto;

import com.example.backend.entity.mariaDB.member.Member;
import java.awt.Point;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class AroundDto {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {

        private Long memberId;
        private Integer characterId;
        private Integer positionX;
        private Integer positionY;
    }

    public static Response toAroundDtoResponse(List<Member> members, Member member,
            List<Point> points) {
        Long memberId = member.getId();
        Integer characterId = member.getCharacterId();
        int positionX = 0;
        int positionY = 0;
        if(members.size() != 0) {
            int idx = members.indexOf(member);
            Point point = points.get(idx);
            positionX = point.x;
            positionY = point.y;

        }

        return Response.builder()
                .memberId(memberId)
                .characterId(characterId)
                .positionX(positionX)
                .positionY(positionY)
                .build();
    }
}
