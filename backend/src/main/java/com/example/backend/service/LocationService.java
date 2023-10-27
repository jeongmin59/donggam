package com.example.backend.service;

import com.example.backend.dto.LocationDto;
import com.example.backend.dto.LocationDto.Response;
import com.example.backend.entity.postgreSQL.Location;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.type.CustomException;
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
  public Long saveLocation(Long locationId, Double latitude, Double longitude){
    if (locationId == null) {
      Location location = locationRepository.save(new Location(latitude, longitude));
      return location.getId();
    } else {
      Location location = locationRepository.findById(locationId)
          .orElseThrow(() -> new CustomException(ErrorCode.NOT_SAME_DATA_VALUE.getMessage(), ErrorCode.NOT_SAME_DATA_VALUE));
      location.setLatitude(latitude);
      location.setLongitude(longitude);
      return location.getId();
    }
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
