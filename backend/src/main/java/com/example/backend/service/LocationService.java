package com.example.backend.service;

import com.example.backend.entity.postgreSQL.MemberLocation;
import com.example.backend.repository.postgreSQL.MemberLocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
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
