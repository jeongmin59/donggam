package com.example.backend.controller.chat;

import com.example.backend.dto.Response;
import com.example.backend.dto.chat.GetRoomListDto;
import com.example.backend.service.chat.ChatRoomService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "채팅방 API")
@RestController
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    @Operation(summary = "채팅방 목록 조회 API", description = "채팅방 목록 조회 API")
    @GetMapping("/room/list")
    public Response<GetRoomListDto.Response> getRoomList(@AuthenticationPrincipal UserDetails userDetails) {
        Long memberId = Long.parseLong(userDetails.getUsername());
        GetRoomListDto.Response response =chatRoomService.getRoomList(memberId);
        return new Response<>(200, "채팅방 조회 완료", response);
    }

}
