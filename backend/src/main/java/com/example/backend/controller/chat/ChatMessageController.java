package com.example.backend.controller.chat;

import com.example.backend.dto.chat.SendChatMessageDto;
import com.example.backend.entity.mariaDB.member.Member;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.type.CustomException;
import com.example.backend.repository.mariaDB.MemberRepository;
import com.example.backend.service.chat.ChatMessageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;

@Tag(name = "채팅 메세지 API" ,description = "채팅 메세지 API")
@RequiredArgsConstructor
@Controller
public class ChatMessageController {

    private final ChatMessageService chatMessageService;

    @Operation(summary = "메세지 보내기", description = "메세지 보내기")
    @MessageMapping("/chat/message")
    public SendChatMessageDto.Response message(
            SendChatMessageDto.Request request
    ) {
        SendChatMessageDto.Response response = chatMessageService.sendMessage(request);
        return response;
    }
}