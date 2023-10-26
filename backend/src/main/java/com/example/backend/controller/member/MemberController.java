package com.example.backend.controller.member;

import com.example.backend.dto.LoginDto;
import com.example.backend.dto.Response;
import com.example.backend.dto.TokenDto;
import com.example.backend.service.Member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

  private final MemberService memberService;

  @GetMapping("/login")
  public Response<LoginDto.Response> login(@RequestParam("code") String code) {
    return new Response<>(200, "로그인 성공", memberService.login(code));
  }

}
