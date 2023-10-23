package com.example.backend.service;

import com.example.backend.dto.LocationDto;
import com.example.backend.entity.progreSQL.Location;
import com.example.backend.repository.progreSQL.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LocationService {

  private final LocationRepository locationRepository;

  public void saveLocation(LocationDto.Request request) {
    locationRepository.save(
        Location.builder()
            .longitude(request.getLongitude())
            .latitude(request.getLatitude())
            .build()
    );
  }
}
