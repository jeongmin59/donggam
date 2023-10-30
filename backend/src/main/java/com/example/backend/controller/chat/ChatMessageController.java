package com.example.backend.controller.chat;

import com.example.backend.dto.chat.SendChatMessageDto;
import com.example.backend.entity.mariaDB.member.Member;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.type.CustomException;
import com.example.backend.repository.mariaDB.MemberRepository;
import com.example.backend.service.chat.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
public class ChatMessageController {

    private final ChatMessageService chatMessageService;
    private final MemberRepository memberRepository;

    @MessageMapping("/chat/message")
    public void message(
            SendChatMessageDto.Request request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        Long memberId = Long.parseLong(userDetails.getUsername());
        Member member = memberRepository.findById(memberId).get();
        if (member == null) {
            throw new CustomException("존재하지 않는 회원입니다.", ErrorCode.USER_NOT_FOUND);
        }
        chatMessageService.sendMessage(request, member);
    }
}