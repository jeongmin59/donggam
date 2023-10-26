package com.example.backend.service;

import com.example.backend.dto.AroundDto;
import com.example.backend.dto.MainDto;
import com.example.backend.entity.mariaDB.member.Member;
import com.example.backend.entity.postgreSQL.Location;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.type.CustomException;
import com.example.backend.repository.mariaDB.MemberRepository;
import com.example.backend.repository.postgreSQL.LocationRepository;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MainService {

  private final MemberRepository memberRepository;
  private final LocationRepository locationRepository;
  private final LocationService locationService;

  // 필요한거 : 내 닉네임, 내 상태메시지, 내 캐릭터 id,  주변사람 카운트, 주변 사람들 정보
  public MainDto.Response mainPage(MainDto.Request request) {
    Long locationId = locationService.saveLocation(request.getLatitude(), request.getLongitude());

    Member member = memberRepository.findWithRelatedEntityById(request.getMemberId())
        .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND.getMessage(), ErrorCode.USER_NOT_FOUND));

    member.setLocationId(locationId);
    memberRepository.save(member);

    List<AroundDto.Response> aroundPeople = getAroundPeople(locationId);
    Integer aroundPeopleCount = aroundPeople.isEmpty() ? 0 : aroundPeople.size();

    return MainDto.toMainDtoResponse(
        member.getNickname(), member.getStatus().getContent(), member.getCharacterId(),
        aroundPeopleCount, aroundPeople
    );
  }

  private List<AroundDto.Response> getAroundPeople(Long locationId) {
    Location location = locationRepository.findById(locationId)
        .orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND.getMessage(), ErrorCode.ENTITY_NOT_FOUND));

    // 반경 1km이내의 사용자들 탐색
    List<Location> locations = locationRepository.findWithinRadius(location.getLatitude(), location.getLongitude(), 1000d).stream()
        .filter(l -> !l.getId().equals(locationId))
        .collect(Collectors.toList());;

    if (locations.isEmpty()) {
      return Collections.emptyList();
    } else {
      Collections.shuffle(locations);
      int number = Math.min(locations.size(), 5); // 5와 리스트의 크기 중 작은 값을 선택
      locations = locations.subList(0, number); // 무작위로 선택된 요소만 포함하는 새 리스트 생성
    }

    List<Long> locationsIds = locations.stream().map(Location::getId).collect(Collectors.toList());

    List<Member> members = memberRepository.findByLocationIdIn(locationsIds);

    return members.stream()
        .map(member -> AroundDto.toAroundDtoResponse(member.getId(), member.getCharacterId()))
        .collect(Collectors.toList());
  }

}
