package com.example.backend.service;

import com.example.backend.dto.AroundDto;
import com.example.backend.dto.MainDto;
import com.example.backend.entity.mariaDB.Emotion;
import com.example.backend.entity.mariaDB.member.Member;
import com.example.backend.entity.postgreSQL.MemberLocation;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.type.CustomException;
import com.example.backend.repository.mariaDB.MemberRepository;
import com.example.backend.repository.postgreSQL.MemberLocationRepository;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MainService {

  private final MemberRepository memberRepository;
  private final MemberLocationRepository memberLocationRepository;
  private final LocationService locationService;

  // 필요한거 : 내 닉네임, 내 상태메시지, 내 캐릭터 id,  주변사람 카운트, 주변 사람들 정보
  public MainDto.Response mainPage(MainDto.Request request) {
    Long memberId = request.getMemberId();
    Member member = memberRepository.findById(memberId)
        .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND.getMessage(), ErrorCode.USER_NOT_FOUND));

    locationService.saveLocation(memberId, request.getLatitude(), request.getLongitude());

    List<Member> members = getAroundMembers(memberId);
    if (members.isEmpty()) {
      return MainDto.Response.builder()
          .statusWeather(member.getStatus().get(member.getStatus().size() - 1).getEmotion())
          .aroundPeopleCount(0)
          .aroundPeople(null)
          .build();
    }

    List<AroundDto.Response> aroundPeople = getAroundPeople(members);
    Integer aroundPeopleCount = aroundPeople == null ? 0 : aroundPeople.size();

    Emotion statusWeather = getStatusWeather(members);

    return MainDto.Response.builder()
        .statusWeather(statusWeather)
        .aroundPeopleCount(aroundPeopleCount)
        .aroundPeople(aroundPeople)
        .build();
  }

  private List<AroundDto.Response> getAroundPeople(List<Member> members) {
    return members.stream()
        .map(member -> AroundDto.Response.builder()
            .memberId(member.getId())
            .characterId(member.getCharacterId())
            .build())
        .collect(Collectors.toList());
  }

  private Emotion getStatusWeather(List<Member> members) {
    int neutralCount = 0;
    int positiveCount = 0;
    int negativeCount = 0;

    for (Member member : members) {
      int lastStatusIndex = member.getStatus().size() - 1;
      if (member.getStatus().get(lastStatusIndex).getEmotion() == Emotion.NEGATIVE) {
      negativeCount ++;
    } else if (member.getStatus().get(lastStatusIndex).getEmotion() == Emotion.POSITIVE) {
      positiveCount ++;
    } else if (member.getStatus().get(lastStatusIndex).getEmotion() == Emotion.NEUTRAL) {
      neutralCount ++;
    }
  }

    if (neutralCount >= (positiveCount + neutralCount) / 2 + 1) {
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

  private List<Member> getAroundMembers(Long locationId) {
    MemberLocation location = memberLocationRepository.findById(locationId)
        .orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND.getMessage(), ErrorCode.ENTITY_NOT_FOUND));

    // 반경 10km이내의 사용자들의 id를 탐색
    List<Long> locationIds = memberLocationRepository.findWithinRadius(location.getLatitude(), location.getLongitude(), 10000d).stream()
        .map(MemberLocation::getId)
        .filter(id -> !id.equals(locationId))
        .collect(Collectors.toList());

    if (locationIds.isEmpty()) {
      return Collections.emptyList();
    } else {
      Collections.shuffle(locationIds);
      int number = Math.min(locationIds.size(), 5); // 5와 리스트의 크기 중 작은 값을 선택
      locationIds = locationIds.subList(0, number); // 무작위로 선택된 요소만 포함하는 새 리스트 생성
    }

    return memberRepository.findByIdIn(locationIds);
  }

}
