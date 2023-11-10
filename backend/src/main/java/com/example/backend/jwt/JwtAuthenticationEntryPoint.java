package com.example.backend.jwt;

import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.type.CustomException;
import com.example.backend.util.mattermost.NotificationManager;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

  private final NotificationManager notificationManager;

  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
    // 유효한 자격증명을 제공하지 않고 접근하려 할때 401
    response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
//    notificationManager.sendNotification(
//        new CustomException(ErrorCode.UNAUTHORIZED_ERROR.getMessage(), ErrorCode.UNAUTHORIZED_ERROR), request.getRequestURI(), request.getParameterMap().toString());
  }

}
