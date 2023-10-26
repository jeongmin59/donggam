package com.example.backend.service;

import com.example.backend.dto.LocationDto;
import com.example.backend.dto.LocationDto.Response;
import com.example.backend.entity.postgreSQL.Location;
import com.example.backend.repository.postgreSQL.LocationRepository;
import java.util.List;
import java.util.stream.Collectors;
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
  public Long saveLocation(Double latitude, Double longitude){
    // 입력받은 위도, 경도를 4326좌표계로 변환
    GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);
    Point point = geometryFactory.createPoint(new Coordinate(latitude, longitude));

    // 변환한 point를 저장하고 해당 point의 id를 반환
    Location location = locationRepository.save(new Location(latitude, longitude));
    return location.getId();
  }

  public List<Response> findLocations(Long locationId) {
    Location location = locationRepository.findById(locationId).orElse(null);

    List<Location> locations = locationRepository.findWithinRadius(location.getLatitude(), location.getLongitude(), 1000d);
    return locations.stream()
        .map(l -> LocationDto.Response.builder()
            .id(l.getId())
            .latitude(l.getLatitude())
            .longitude(l.getLongitude())
            .build())
        .collect(Collectors.toList());
  }
}
