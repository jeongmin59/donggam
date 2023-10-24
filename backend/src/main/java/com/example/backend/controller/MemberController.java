package com.example.backend.controller;

import com.example.backend.entity.OauthToken;
import com.example.backend.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
  public ResponseEntity<OauthToken> login(@RequestParam("code") String code) {
    System.out.println(code);
    return ResponseEntity.ok(memberService.getAccessToken(code));
  }

}
