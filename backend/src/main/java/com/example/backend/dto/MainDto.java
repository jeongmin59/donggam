package com.example.backend.dto;

import com.example.backend.entity.mariaDB.member.Member;
import com.example.backend.type.Emotion;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class MainDto {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {

        private Long memberId;
        private Double latitude;
        private Double longitude;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {

        private Integer characterId;
        private String nickname;
        private Long statusId;
        private String status;
        private Integer unreadMessageCount;
        private Integer unreadChatCount;
        private Emotion statusWeather;
        private Integer aroundPeopleCount;
        private List<AroundDto.Response> aroundPeople;
    }

    public static Response toDtoAlone(Member member, int unreadChatCount) {
        return Response.builder()
                .unreadMessageCount(
                        (int) member.getStatus().get(member.getStatus().size() - 1).getMessage()
                                .stream()
                                .filter(message -> !message.getIsRead())
                                .count())
                .unreadChatCount(unreadChatCount)
                .statusWeather(
                        member.getStatus().get(member.getStatus().size() - 1).getEmotion())
                .aroundPeopleCount(0)
                .aroundPeople(null)
                .characterId(member.getCharacterId())
                .nickname(member.getNickname())
                .statusId(member.getStatus().get(member.getStatus().size() - 1).getId())
                .status(member.getStatus().get(member.getStatus().size() - 1).getContent())
                .build();
    }

    public static Response toDtoWith(Member member, Emotion statusWeather, int unreadChatCount,
            int aroundPeopleCount, List<AroundDto.Response> aroundPeople) {
        return Response.builder()
                .unreadMessageCount(
                        (int) member.getStatus().get(member.getStatus().size() - 1).getMessage()
                                .stream()
                                .filter(message -> !message.getIsRead())
                                .count())
                .statusWeather(statusWeather)
                .unreadChatCount(unreadChatCount)
                .aroundPeopleCount(aroundPeopleCount)
                .aroundPeople(aroundPeople)
                .characterId(member.getCharacterId())
                .nickname(member.getNickname())
                .statusId(member.getStatus().get(member.getStatus().size() - 1).getId())
                .status(member.getStatus().get(member.getStatus().size() - 1).getContent())
                .build();
    }
}
