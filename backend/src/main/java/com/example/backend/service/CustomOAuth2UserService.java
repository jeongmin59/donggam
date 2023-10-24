package com.example.backend.service;

import com.example.backend.entity.mariaDB.Member;
import com.example.backend.repository.mariaDB.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final MemberRepository memberRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        DefaultOAuth2UserService delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String id = oAuth2User.getName();
        String defaultNickname = "익명의 감자";
        int defaultChracterId = 1;

        if (!memberRepository.existsById(id)) {
            Member member = Member.builder()
                    .id(oAuth2User.getName())
                    .nickname(defaultNickname)
                    .characterId(defaultChracterId)
                    .build();

            memberRepository.save(member);
        }

        return oAuth2User;
    }
}
