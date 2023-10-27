package com.example.backend.controller.time;

import com.example.backend.dto.ImageDto;
import com.example.backend.dto.Response;
import com.example.backend.service.TimeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
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

    return new Response<>(201, "사진 업로드 성공", "사진 업로드 성공");
  }

  @Operation(summary = "전체 사진목록 조회", description = "전체 사진목록 조회")
  @GetMapping
  public Response<List<ImageDto.Response>> getImages(
      @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails
  ) {
    Long memberId = Long.parseLong(userDetails.getUsername());
    return new Response<>(200, "전체 사진 조회 성공", timeService.getImages(memberId));
  }
}
