package com.example.backend.controller;

import com.example.backend.dto.LocationDto;
import com.example.backend.service.LocationService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/location")
public class LocationController {

  private final LocationService locationService;

  @Operation(summary = "위치 저장 테스트", description = "위치 저장 테스트")
  @PostMapping("")
  public void saveLocation(@RequestBody LocationDto.Request request) {
    locationService.saveLocation(request);
  }
}
