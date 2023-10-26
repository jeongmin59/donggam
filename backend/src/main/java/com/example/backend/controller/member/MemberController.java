package com.example.backend.controller.member;

import com.example.backend.dto.LoginDto;
import com.example.backend.dto.Response;
import com.example.backend.dto.TokenDto;
import com.example.backend.service.Member.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

//  @Operation(summary = "회원 닉네임 수정", description = "회원 닉네임 수정")
//  @PutMapping("/nickname")
//  public Response<String>


}
