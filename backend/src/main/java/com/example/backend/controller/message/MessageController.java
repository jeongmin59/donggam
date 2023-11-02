package com.example.backend.controller.message;

import com.example.backend.dto.message.GetStatusListDto;
import com.example.backend.dto.message.GetMessageDetailDto;
import com.example.backend.dto.message.GetMessageListDto;
import com.example.backend.dto.message.LikeMessageDto;
import com.example.backend.dto.message.SendMessageDto;
import com.example.backend.dto.Response;
import com.example.backend.service.message.MessageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "쪽지 API", description = "쪽지 API")
@RestController
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @Operation(summary = "쪽지 전송 API", description = "쪽지 전송 API")
    @PostMapping(path = "/message/send", consumes = "multipart/form-data")
    public Response<SendMessageDto.Response> sendMessage(
            @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails,
            @RequestPart(value = "request") SendMessageDto.Request request, @RequestPart(value = "image",required = false) MultipartFile img
    ) throws IOException {
        Long memberId = Long.parseLong(userDetails.getUsername());
        SendMessageDto.Response response = messageService.sendMessage(memberId, img, request);
        return new Response<>(201, "메세지 전송 완료", response);
    }

    @Operation(summary = "상태 목록 조회 API", description = "상태 목록 조회 API")
    @GetMapping("/message/status/list")
    public Response<GetStatusListDto.Response> getMessageList(
            @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails) {
        Long memberId = Long.parseLong(userDetails.getUsername());
        GetStatusListDto.Response response = messageService.getMessageAndStatusList(memberId);
        return new Response<>(200, "상태 목록 조회 완료", response);
    }

    @Operation(summary = "메세지 목록 조회 API", description = "메세지 목록 조회 API")
    @GetMapping("/message/list/{statusId}")
    public Response<GetMessageListDto.Response> getMessageList(@PathVariable Long statusId) {
        GetMessageListDto.Response response = messageService.getMessageList(statusId);
        return new Response<>(200, "메세지 목록 조회 완료", response);
    }

    @Operation(summary = "메세지 상세보기 API", description = "메세지 상세보기 API")
    @GetMapping("/message/detail/{messageId}")
    public Response<GetMessageDetailDto.Response> getMessageDetail(@PathVariable Long messageId) {
        GetMessageDetailDto.Response response = messageService.getMessageDetail(messageId);
        return new Response<>(200, "메세지 조회 완료", response);
    }

    @Operation(summary = "메세지 읽음", description = "메세지 좋아요 반영")
    @PostMapping("/message/read/{messageId}")
    public Response readMessage(@PathVariable Long messageId) {
        messageService.readMessage(messageId);
        return new Response(201, "메세지 읽음 표시");
    }

    @Operation(summary = "메세지 좋아요 반영", description = "메세지 좋아요 반영")
    @PostMapping("/message/like")
    public Response likeMessage(@RequestBody LikeMessageDto.Request request) {
        messageService.likeMessage(request);
        return new Response(201, "메세지 좋아요 반영 완료");
    }
}
