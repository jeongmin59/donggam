package com.example.backend.controller.space;

import com.example.backend.dto.Response;
import com.example.backend.dto.landmark.LandMarkCommentDto;
import com.example.backend.dto.landmark.LandMarkRecordDto;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.type.CustomException;
import com.example.backend.service.LandMarkService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/space/landmark")
@Tag(name = "공간 페이지 API", description = "공간 페이지 API")
@RequiredArgsConstructor
public class LandMarkController {

  private final LandMarkService landMarkService;

  // 가장 가까운 랜드마크 검색


  // 랜드마크에 방명록 작성
  @Operation(summary = "랜드마크 방명록 작성", description = "랜드마크 방명록 작성")
  @PostMapping(path = "/{landMarkId}", consumes = "multipart/form-data")
  public Response<String> createLandMarkRecords(
      @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails,
      @PathVariable("landMarkId") Long landMarkId,
      @RequestParam(required = false) String content,
      @RequestParam(required = false) MultipartFile image) throws IOException {

    if (content == null && image == null) {
      throw new CustomException(ErrorCode.INVALID_INPUT_VALUE.getMessage(), ErrorCode.INVALID_INPUT_VALUE);
    }

    Long memberId = Long.parseLong(userDetails.getUsername());
    return new Response<>(201, "랜드마크 방명록 작성 성공", landMarkService.createLandMarkRecord(memberId, landMarkId, content, image));
  }

  // 랜드마크의 방명록 목록 조회
  @Operation(summary = "랜드마크 방명록 조회", description = "랜드마크 방명록 조회")
  @GetMapping("/{landMarkId}")
  public Response<List<LandMarkRecordDto.Response>> landMarkRecords(@PathVariable("landMarkId") Long landMarkId) {
    return new Response<>(200, "랜드마크 방명록 목록 조회 성공", landMarkService.landMarkRecords(landMarkId));
  }

  @Operation(summary = "랜드마크 방명록 댓글 작성", description = "랜드마크 방명록 댓글 작성")
  @PostMapping("/comment/{recordId}")
  public Response<LandMarkCommentDto.Response> createdComment(
      @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails,
      @RequestBody LandMarkCommentDto.Request request,
      @PathVariable("recordId") Long recordId
  ) {
    Long memberId = Long.parseLong(userDetails.getUsername());
    return new Response<>(201, "댓글 작성 성공", landMarkService.createComment(memberId, recordId, request));
  }

}
