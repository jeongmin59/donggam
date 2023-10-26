package com.example.backend.controller.member;

import com.example.backend.dto.LoginDto;
import com.example.backend.dto.Response;
import com.example.backend.dto.memberUpdate.UpdateCharacterDto;
import com.example.backend.dto.memberUpdate.UpdateDto;
import com.example.backend.dto.memberUpdate.UpdateNicknameDto;
import com.example.backend.dto.memberUpdate.UpdateStatusDto;
import com.example.backend.service.Member.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "회원 API", description = "회원 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

  private final MemberService memberService;

  @Operation(summary = "카카오 소셜로그인 후 회원 정보 반환", description = "카카오 소셜 로그인 후 회원 정보 반환")
  @GetMapping("/login")
  public Response<LoginDto.Response> login(@RequestParam("code") String code) {
    return new Response<>(200, "로그인 성공", memberService.login(code));
  }

  @Operation(summary = "회원 닉네임 수정", description = "회원 닉네임 수정")
  @PostMapping("/nickname")
  public Response<UpdateNicknameDto.Response> updateNickname(
      @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails,
      @RequestBody UpdateNicknameDto.Request request
      ) {
    Long memberId = Long.parseLong(userDetails.getUsername());
    String newNickname = request.getNickname();
    return new Response<>(200, "닉네임 변경 성공", memberService.updateNickname(memberId, newNickname));
  }

  @Operation(summary = "회원 캐릭터 수정", description = "회원 캐릭터 수정")
  @PostMapping("/character")
  public Response<UpdateCharacterDto.Response> updateCharacter(
      @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails,
      @RequestBody UpdateCharacterDto.Request request
  ) {
    Long memberId = Long.parseLong(userDetails.getUsername());
    return new Response<>(200, "캐릭터 변경 성공", memberService.updateCharacter(memberId, request.getCharacterId()));
  }

  @Operation(summary = "회원 상태메시지 수정", description = "회원 상태메시지 수정")
  @PostMapping("/status")
  public Response<UpdateStatusDto.Response> updateStatus(
      @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails,
      @RequestBody UpdateStatusDto.Request request
  ) {
    Long memberId = Long.parseLong(userDetails.getUsername());
    return new Response<>(200, "상태메시지 변경 성공", memberService.updateStatus(memberId, request.getStatus()));
  }

  @Operation(summary = "전체 회원정보 수정", description = "전체 회원정보 수정")
  @PostMapping("/update")
  public Response<UpdateDto.Response> update(
      @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails,
      @RequestBody UpdateDto.Request request
  ) {
    Long memberId = Long.parseLong(userDetails.getUsername());
    return new Response<>(200, "회원 정보 수정 성공", memberService.update(memberId, request));
  }
}
