package com.example.backend.controller.time;

import com.example.backend.dto.Response;
import com.example.backend.service.TimeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/time")
@RequiredArgsConstructor
@Tag(name = "시간 페이지 API", description = "시간 페이지 API")
public class TimeController {

  private final TimeService timeService;
  
  @Operation(summary = "사진 등록", description = "사진 등록")
  @PostMapping(consumes = "multipart/form-data")
  public Response<String> postImage(
      @AuthenticationPrincipal UserDetails userDetails,
      String title,
      @RequestParam MultipartFile img) {
    Long memberId = Long.parseLong(userDetails.getUsername());

    timeService.postImage(memberId, img, title);

    return new Response<>(200, "사진 업로드 성공", "사진 업로드 성공");
  }
}
