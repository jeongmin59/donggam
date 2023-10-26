package com.example.backend.service;

import com.example.backend.dto.LocationDto;
import com.example.backend.entity.postgreSQL.Location;
import com.example.backend.repository.postgreSQL.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LocationService {

  private final LocationRepository locationRepository;

  // 위도, 경도를 입력받아서 위치를 저장
  public Long saveLocation(LocationDto.Request request){
    // 입력받은 위도, 경도를 4326좌표계로 변환
    GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);
    Point point = geometryFactory.createPoint(new Coordinate(request.getLatitude(), request.getLongitude()));
    
    // 변환한 point를 저장하고 해당 point의 id를 반환
    Location location = locationRepository.save(Location.builder()
        .point(point)
        .build());
    return location.getId();
  }
}
