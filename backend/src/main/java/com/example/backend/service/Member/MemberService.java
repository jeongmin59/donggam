package com.example.backend.service.Member;

import com.example.backend.dto.LoginDto;
import com.example.backend.dto.TokenDto;
import com.example.backend.entity.OauthToken;
import com.example.backend.entity.mariaDB.member.Authority;
import com.example.backend.entity.mariaDB.member.Member;
import com.example.backend.jwt.TokenProvider;
import com.example.backend.repository.mariaDB.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class MemberService {

  private final MemberRepository memberRepository;
  private final AuthenticationManagerBuilder authenticationManagerBuilder;
  private final TokenProvider tokenProvider;

  public TokenDto login(String code) {

     return myToken(kakaoToken(code));
  }

  private String kakaoToken(String code) {
    RestTemplate rt = new RestTemplate();

    HttpHeaders headers = new HttpHeaders();
    headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

    MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
    params.add("grant_type", "authorization_code");
    params.add("client_id", "48fe0d040eac475f7b407702d4e3d9ca");
    params.add("redirect_uri", "http://localhost:3000/oauth2/kakao/callback");
    params.add("code", code);
    params.add("client_secret", "Tw1eluHepyso7S7ZKixxwnrBgX4g8b1O");

    HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

    ResponseEntity<String> response = rt.exchange(
        "https://kauth.kakao.com/oauth/token",
        HttpMethod.POST,
        kakaoTokenRequest,
        String.class
    );

    String responseBody = response.getBody();

    JSONObject jsonObject = new JSONObject(responseBody);
    OauthToken oauthToken = new OauthToken();
    oauthToken.setAccessToken(jsonObject.getString("access_token"));
    oauthToken.setRefreshToken(jsonObject.getString("refresh_token"));
    oauthToken.setTokenType(jsonObject.getString("token_type"));
    oauthToken.setAccessExpiration(jsonObject.getInt("expires_in"));
    oauthToken.setRefreshExpiration(jsonObject.getInt("refresh_token_expires_in"));

    return jsonObject.getString("access_token");
  }

  // 카카오에서 회원 정보를 가져와서
  // 이미 존재하는 회원이면 로그인
  // 새로운 회원이면 회원가입 진행
  private TokenDto myToken(String accessToken) {
    HttpHeaders headers = new HttpHeaders();
    headers.set("Authorization", "Bearer " + accessToken);
    headers.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

    HttpEntity<String> entity = new HttpEntity<>(headers);

    RestTemplate rt = new RestTemplate();
    ResponseEntity<String> response = rt.exchange(
        "https://kapi.kakao.com/v2/user/me",
        HttpMethod.GET,
        entity,
        String.class
    );

    String responseBody = response.getBody();
    JSONObject jsonObject = new JSONObject(responseBody);
    Long memberId = jsonObject.getLong("id");
    String email = jsonObject.getJSONObject("kakao_account").getString("email");

    Member member = memberRepository.findById(memberId)
            .orElse(
                memberRepository.save(Member.builder()
                    .id(memberId)
                    .email(email)
                    .characterId(1)
                    .nickname("익명의 감자")
                    .authority(Authority.ROLE_USER)
                    .build())
            );

    LoginDto loginDto = new LoginDto();
    loginDto.setId(memberId);
    loginDto.setEmail(email);

    UsernamePasswordAuthenticationToken authenticationToken = loginDto.toAuthentication();

    Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

    TokenDto tokenDto = tokenProvider.createToken(authentication);
    System.out.println(tokenDto);
    return tokenDto;
  }
}
