package com.example.backend.controller;

import com.example.backend.dto.LocationDto;
import com.example.backend.repository.postgreSQL.MemberLocationRepository;
import com.example.backend.service.LocationService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/location")
@RequiredArgsConstructor
public class LocationController {

  private final LocationService locationService;
  private final MemberLocationRepository memberLocationRepository;

//  @PostMapping("/savetest")
//  public LocationDto.Response saveLocation(@RequestBody LocationDto.Request request) {
//    Long locationId = locationService.saveLocation(request.getLatitude(), request.getLongitude());
//    Location location = locationRepository.findById(locationId).orElseThrow(() -> new NotFoundException("위치 없음"));
//    return LocationDto.Response.builder()
//        .id(location.getId())
//        .latitude(request.getLatitude())
//        .longitude(request.getLongitude())
//        .build();
//  }

//  @GetMapping("/findtest/{locationId}")
//  public List<LocationDto.Response> findLocations(@PathVariable("locationId") Long locationId) {
//    return locationService.findLocations(locationId);
//  }
}
