package com.example.backend.controller.chat;

import com.example.backend.dto.Response;
import com.example.backend.dto.chat.GetRoomListDto;
import com.example.backend.service.chat.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    @GetMapping("/room/list")
    public Response<GetRoomListDto.Response> getRoomList(@AuthenticationPrincipal UserDetails userDetails) {
        Long memberId = Long.parseLong(userDetails.getUsername());
        GetRoomListDto.Response response =chatRoomService.getRoomList(memberId);
        return new Response<>(200, "채팅방 조회 완료", response);
    }

}
