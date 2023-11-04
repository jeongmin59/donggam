package com.example.backend.controller.chat;

import com.example.backend.dto.Response;
import com.example.backend.dto.chat.GetChatListDto;
import com.example.backend.dto.chat.GetRoomListDto;
import com.example.backend.dto.chat.InviteChatDto;
import com.example.backend.service.chat.ChatRoomService;
import com.example.backend.service.chat.ChatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "채팅방 API")
@RestController
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomService chatRoomService;
    private final ChatService chatService;

    @Operation(summary = "채팅방 목록 조회 API", description = "채팅방 목록 조회 API")
    @GetMapping("/room/list")
    public Response<GetRoomListDto.Response> getRoomList(
            @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails) {
        Long memberId = Long.parseLong(userDetails.getUsername());
        GetRoomListDto.Response response = chatRoomService.getRoomList(memberId);
        return new Response<>(200, "채팅방 조회 완료", response);
    }


    @Operation(summary = "채팅 내용 조회", description = "채팅 내용 조회")
    @GetMapping("/chat/list/{roomId}")
    public Response<GetChatListDto.Response> getChatList(@PathVariable Long roomId) {
        GetChatListDto.Response response = chatService.getChatList(roomId);
        return new Response<>(200, "채팅 내용 조회 완료", response);
    }

    @Operation(summary = "채팅 신청", description = "채팅 신청")
    @PostMapping("/chat/invite")
    public Response<InviteChatDto.Response> inviteChat(@RequestBody InviteChatDto.Request request,
            @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails) {
        Long memberId = Long.parseLong(userDetails.getUsername());
        return new Response<>(201, "채팅 신청 완료", chatService.inviteChat(request, memberId));
    }
}
