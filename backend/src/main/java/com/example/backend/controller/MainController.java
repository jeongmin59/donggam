package com.example.backend.controller;


import com.example.backend.dto.MainDto;
import com.example.backend.dto.Response;
import com.example.backend.service.MainService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "메인페이지 API", description = "메인페이지 API")
@RestController
@RequestMapping("/main")
@RequiredArgsConstructor
public class MainController {

  private final MainService mainService;

  @Operation(summary = "메인 화면 API", description = "메인화면 API")
  @PostMapping
  public Response<MainDto.Response> mainPage(@RequestBody MainDto.Request request) {
    return new Response<>(200, "메인페이지 주변 정보", mainService.mainPage(request));
  }
}
