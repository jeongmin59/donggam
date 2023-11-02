package com.example.backend.jwt;

import com.example.backend.entity.mariaDB.member.Member;
import com.example.backend.repository.mariaDB.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CustomAuthenticationProvider implements AuthenticationProvider {

  private final MemberRepository memberRepository;

  @Override
  public Authentication authenticate(Authentication authentication) throws AuthenticationException {
    Long id = Long.parseLong(authentication.getName());
    String email = authentication.getCredentials().toString();

    Member member = memberRepository.findById(id)
        .orElseThrow(() -> new BadCredentialsException("Invalid"));

    return new UsernamePasswordAuthenticationToken(id, email);
  }

  @Override
  public boolean supports(Class<?> authentication) {
    return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
  }
}
