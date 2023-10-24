package com.example.backend.service;

import com.example.backend.entity.OauthToken;
import com.example.backend.repository.mariaDB.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class MemberService {

  private final MemberRepository memberRepository;

  public OauthToken getAccessToken(String code) {

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

    return oauthToken;
  }

}
