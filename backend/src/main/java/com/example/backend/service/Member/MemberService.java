package com.example.backend.service.Member;

import com.example.backend.dto.LoginDto;
import com.example.backend.dto.TokenDto;
import com.example.backend.dto.memberUpdate.UpdateCharacterDto;
import com.example.backend.dto.memberUpdate.UpdateDto;
import com.example.backend.dto.memberUpdate.UpdateNicknameDto;
import com.example.backend.dto.memberUpdate.UpdateNicknameDto.Response;
import com.example.backend.dto.memberUpdate.UpdateStatusDto;
import com.example.backend.entity.OauthToken;
import com.example.backend.entity.mariaDB.Status;
import com.example.backend.entity.mariaDB.member.Authority;
import com.example.backend.entity.mariaDB.member.Member;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.type.CustomException;
import com.example.backend.jwt.TokenProvider;
import com.example.backend.repository.mariaDB.MemberRepository;
import com.example.backend.repository.mariaDB.StatusRepository;
import java.util.List;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
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
  private final StatusRepository statusRepository;
  private final AuthenticationManagerBuilder authenticationManagerBuilder;
  private final TokenProvider tokenProvider;

  private static final String[] nicknames = {"", "익명의 병아리", "익명의 고양이", "익명의 여우", "익명의 북극곰",
                                              "익명의 강아지", "익명의 토끼", "익명의 고슴도치", "익명의 쥐",
                                              "익명의 물개", "익명의 펭귄", "익명의 공룡", "익명의 고래"};


  public LoginDto.Response login(String code) {
     return myInfo(kakaoToken(code));
  }

  public UpdateNicknameDto.Response updateNickname(Long memberId, String newNickname) {
    Member member = memberRepository.findById(memberId)
        .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND.getMessage(), ErrorCode.USER_NOT_FOUND));

    member.setNickname(newNickname);
    Member savedMember = memberRepository.save(member);

    return new UpdateNicknameDto.Response(savedMember.getNickname());
  }

  public UpdateCharacterDto.Response updateCharacter(Long memberId, Integer newCharacterId) {
    Member member = memberRepository.findById(memberId)
        .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND.getMessage(), ErrorCode.USER_NOT_FOUND));

    member.setCharacterId(newCharacterId);
    Member savedMember = memberRepository.save(member);

    return new UpdateCharacterDto.Response(savedMember.getCharacterId());
  }

  public UpdateStatusDto.Response updateStatus(Long memberId, String newStatus) {
    Member member = memberRepository.findWithStatus(memberId)
        .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND.getMessage(), ErrorCode.USER_NOT_FOUND));

    // 네이버 클로바 센티멘트 API의 감정 분석 결과
    String emotion = sentimentAPI(newStatus);

    // 새로운 status 생성 후 member와 연결
    Status status = statusRepository.save(Status.builder()
        .content(newStatus)
        .emotion(emotion).build());

    member.getStatus().add(status);
    Member savedMember = memberRepository.save(member);

    return new UpdateStatusDto.Response(savedMember.getStatus().get(0).getContent(), savedMember.getStatus().get(0).getEmotion().name());
  }

  public UpdateDto.Response update(Long memberId, UpdateDto.Request request) {
    Member member = memberRepository.findWithStatus(memberId)
        .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND.getMessage(), ErrorCode.USER_NOT_FOUND));

    String emotion = sentimentAPI(request.getStatus());
    Status status = statusRepository.save(Status.builder()
        .content(request.getStatus())
        .emotion(emotion)
        .build());

    member.setCharacterId(request.getCharacterId());
    member.setNickname(request.getNickname());
    member.getStatus().add(status);
    Member savedMember = memberRepository.save(member);

    return new UpdateDto.Response(savedMember.getNickname(), savedMember.getCharacterId(), savedMember.getStatus().get(0).getContent(), savedMember.getStatus().get(0).getEmotion().name());
  }

  private String kakaoToken(String code) {
    RestTemplate rt = new RestTemplate();

    HttpHeaders headers = new HttpHeaders();
    headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

    MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
    params.add("grant_type", "authorization_code");
    params.add("client_id", "48fe0d040eac475f7b407702d4e3d9ca");
    params.add("redirect_uri", "http://localhost:5173/kakao/callback");
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
  private LoginDto.Response myInfo(String accessToken) {
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

    Random random = new Random();
    int randomNumber = random.nextInt(12) + 1;

    Member member = memberRepository.findWithStatus(memberId).orElse(null);
//            .orElse(memberRepository.save(new Member(memberId, nicknames[randomNumber], email, randomNumber, Authority.ROLE_USER)));

    if (member == null) {
      member = memberRepository.save(Member.builder()
          .id(memberId)
          .nickname(nicknames[randomNumber])
          .email(email)
          .characterId(randomNumber)
          .authority(Authority.ROLE_USER)
          .build());
    } else {
      List<Status> statusList = member.getStatus();
      if (statusList.isEmpty()) {
        member.setStatus(null);
      }
    }

    LoginDto loginDto = new LoginDto();
    loginDto.setId(memberId);
    loginDto.setEmail(email);

    UsernamePasswordAuthenticationToken authenticationToken = loginDto.toAuthentication();

    Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

    TokenDto tokenDto = tokenProvider.createToken(authentication);

    return LoginDto.toLoginDtoResponse(member, tokenDto);
  }

  private String sentimentAPI(String status) {
    RestTemplate rt = new RestTemplate();

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    headers.set("X-NCP-APIGW-API-KEY-ID", "kg8q3ksj0a");
    headers.set("X-NCP-APIGW-API-KEY", "iR8QaApDyhR1KCnqCqeetI8bFhJf9U6rPOoFL111");

    String request = "{\"content\" : \"" + status + "\"}";

    HttpEntity<String> requestEntity = new HttpEntity<>(request, headers);

    ResponseEntity<String> response = rt.exchange(
        "https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze",
        HttpMethod.POST,
        requestEntity,
        String.class
    );

    JSONObject jsonObject = new JSONObject(response.getBody());
    JSONObject document = jsonObject.getJSONObject("document");
    return document.getString("sentiment");
  }
}
