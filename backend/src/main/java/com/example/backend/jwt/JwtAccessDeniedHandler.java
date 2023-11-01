package com.example.backend.jwt;

import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.type.CustomException;
import com.example.backend.util.mattermost.NotificationManager;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtAccessDeniedHandler implements AccessDeniedHandler {

  private final NotificationManager notificationManager;

  @Override
  public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
    // 필요한 권한이 없이 접근하려 할때 403
    response.sendError(HttpServletResponse.SC_FORBIDDEN);
    notificationManager.sendNotification(
        new CustomException(ErrorCode.FORBIDDEN.getMessage(), ErrorCode.FORBIDDEN), request.getRequestURI(), request.getParameterMap().toString());
  }
}