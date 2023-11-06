package com.example.backend.service;

import com.example.backend.dto.AroundDto;
import com.example.backend.dto.MainDto;
import com.example.backend.dto.MemberDetailDto;
import com.example.backend.entity.mariaDB.chat.Chat;
import com.example.backend.entity.mariaDB.chat.ChatRoom;
import com.example.backend.repository.mariaDB.chat.CustomChatRoomRepository;
import com.example.backend.type.Emotion;
import com.example.backend.entity.mariaDB.member.Member;
import com.example.backend.entity.mariaDB.status.Status;
import com.example.backend.entity.postgreSQL.MemberLocation;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.type.CustomException;
import com.example.backend.repository.mariaDB.member.CustomMemberRepository;
import com.example.backend.repository.mariaDB.member.MemberRepository;
import com.example.backend.repository.postgreSQL.MemberLocationRepository;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MainService {

    private final MemberRepository memberRepository;
    private final CustomMemberRepository customMemberRepository;
    private final MemberLocationRepository memberLocationRepository;
    private final CustomChatRoomRepository customChatRoomRepository;
    private final LocationService locationService;

    // 필요한거 : 내 닉네임, 내 상태메시지, 내 캐릭터 id,  주변사람 카운트, 주변 사람들 정보
    public MainDto.Response mainPage(MainDto.Request request) {
        Long memberId = request.getMemberId();
        Member member = customMemberRepository.findById(memberId);

        member.setLastUpdateTime(LocalDateTime.now());
        member = memberRepository.save(member);

        locationService.saveLocation(memberId, request.getLatitude(), request.getLongitude());

        List<Member> members = getAroundMembers(memberId);

        // 내가 들어간 채팅방 중 내가 활성화된 채팅방 목록을 가져옴
        List<ChatRoom> chatRooms = customChatRoomRepository.findAllByMemberIdAndIsMemberActiveTrue(memberId);
        int unreadChatCount = chatRooms.stream()
                .flatMap(room -> room.getChat().stream())
                .filter(chat -> !Objects.equals(chat.getSender().getId(), memberId) && !chat.getIsRead())
                .mapToInt(chat -> 1)
                .sum();

        // 주변에 다른 사용자를 찾지 못했을 때
        if (members.isEmpty()) {
            return MainDto.Response.builder()
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
                    .build();
        }

        // 다른 사용자를 찾았을 때
        List<AroundDto.Response> aroundPeople = getAroundPeople(members);
        Integer aroundPeopleCount = aroundPeople.size();
        Emotion statusWeather = getStatusWeather(member, members);

        return MainDto.Response.builder()
                .unreadMessageCount(
                        (int) member.getStatus().get(member.getStatus().size() - 1).getMessage()
                                .stream()
                                .filter(message -> !message.getIsRead())
                                .count())
                .statusWeather(statusWeather)
                .unreadChatCount(unreadChatCount)
                .aroundPeopleCount(aroundPeopleCount)
                .aroundPeople(aroundPeople)
                .build();
    }

    public MemberDetailDto.Response otherMember(Long memberId) {
        Member member = customMemberRepository.findById(memberId);

        return MemberDetailDto.toDto(member);
    }

    // 주변사람들의 회원id와 캐릭터id를 가져오는 메서드
    private List<AroundDto.Response> getAroundPeople(List<Member> members) {
        return members.stream()
                .map(member -> AroundDto.Response.builder()
                        .memberId(member.getId())
                        .characterId(member.getCharacterId())
                        .build())
                .collect(Collectors.toList());
    }

    // 감정 날씨 분석 메서드
    private Emotion getStatusWeather(Member me, List<Member> members) {
        int neutralCount = 0;
        int positiveCount = 0;
        int negativeCount = 0;

        for (Member member : members) {
            List<Status> statuses = member.getStatus();
            Emotion lastEmotion = statuses.get(statuses.size() - 1).getEmotion();
            switch (lastEmotion) {
                case NEUTRAL:
                    neutralCount++;
                    break;
                case POSITIVE:
                    positiveCount++;
                    break;
                case NEGATIVE:
                    negativeCount++;
                    break;
            }
        }

        Emotion myEmotion = me.getStatus().get(me.getStatus().size() - 1).getEmotion();
        switch (myEmotion) {
            case NEUTRAL:
                neutralCount++;
                break;
            case POSITIVE:
                positiveCount++;
                break;
            case NEGATIVE:
                negativeCount++;
                break;
        }

        int totalCount = positiveCount + negativeCount + neutralCount;

        if (neutralCount >= (totalCount / 2) + 1) {
            return Emotion.NEUTRAL;
        } else {
            if (positiveCount == negativeCount) {
                return Emotion.NEUTRAL;
            } else if (positiveCount > negativeCount) {
                return Emotion.POSITIVE;
            } else {
                return Emotion.NEGATIVE;
            }
        }
    }

    // 반경 10km이내의 회원을 탐색하는 메서드
    private List<Member> getAroundMembers(Long locationId) {
        // 현재 자신의 위치 정보를 가져 옴
        MemberLocation location = memberLocationRepository.findById(locationId)
                .orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND.getMessage(),
                        ErrorCode.ENTITY_NOT_FOUND));

        // 위치 정보를 기반으로 반경 10km이내의 사용자들의 id를 탐색
        List<Long> locationIds = memberLocationRepository.findWithinRadius(location.getLatitude(),
                        location.getLongitude(), 10000d).stream()
                .map(MemberLocation::getId)
                .filter(id -> !id.equals(locationId))
                .collect(Collectors.toList());

        // 주변에 다른 사용자가 없으면 빈 리스트 반환
        if (locationIds.isEmpty()) {
            return Collections.emptyList();
            // 다른 사용자가 있을 경우에는 랜덤으로 섞어서 최대 5명 반환
        } else {
            Collections.shuffle(locationIds);
            int number = Math.min(locationIds.size(), 5); // 5와 리스트의 크기 중 작은 값을 선택
            locationIds = locationIds.subList(0, number); // 무작위로 선택된 요소만 포함하는 새 리스트 생성
        }

        return customMemberRepository.findByIdInAndLastUpdateTimeAfter(locationIds,
                LocalDateTime.now().minusMinutes(10));
    }
}
