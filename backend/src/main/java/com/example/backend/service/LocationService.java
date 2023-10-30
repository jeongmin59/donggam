package com.example.backend.service;

import com.example.backend.dto.LocationDto;
import com.example.backend.dto.LocationDto.Response;
import com.example.backend.entity.mariaDB.member.Member;
import com.example.backend.entity.postgreSQL.MemberLocation;
import com.example.backend.repository.postgreSQL.MemberLocationRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LocationService {

  private final MemberLocationRepository memberLocationRepository;

  // 위도, 경도를 입력받아서 위치를 저장
  public void saveLocation(Long memberId, Double latitude, Double longitude) {
    memberLocationRepository.findById(memberId).map(l -> {
      l.setLongitude(longitude);
      l.setLatitude(latitude);
      return memberLocationRepository.save(l);
    }).orElseGet(() -> memberLocationRepository.save(MemberLocation.builder().id(memberId).latitude(latitude).longitude(longitude).build()));
  }
}
