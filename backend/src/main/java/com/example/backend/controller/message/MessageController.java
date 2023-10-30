package com.example.backend.controller.message;

import com.example.backend.dto.message.GetMessageAndStatusListDto;
import com.example.backend.dto.message.GetMessageDetailDto;
import com.example.backend.dto.message.GetMessageListDto;
import com.example.backend.dto.message.SendMessageDto;
import com.example.backend.dto.Response;
import com.example.backend.service.message.MessageBoxService;
import com.example.backend.service.message.MessageService;
import io.swagger.v3.oas.annotations.Parameter;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class MessageController {

    private final MessageBoxService messageBoxService;
    private final MessageService messageService;

    @PostMapping(path = "/message/send", consumes = "multipart/form-data")
    public Response<SendMessageDto.Response> sendMessage(
            @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody SendMessageDto.Request request, @RequestParam MultipartFile img
    ) throws IOException {
        Long memberId = Long.parseLong(userDetails.getUsername());
        SendMessageDto.Response response = messageService.sendMessage(memberId, img, request);
        return new Response<>(201, "메세지 전송 완료", response);
    }

    @GetMapping("/message/status/list")
    public Response<GetMessageAndStatusListDto.Response> getMessageList(
            @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails) {
        Long memberId = Long.parseLong(userDetails.getUsername());
        GetMessageAndStatusListDto.Response response = messageService.getMessageAndStatusList(memberId);
        return new Response<>(200, "메세지, 상태 목록 조회 완료", response);
    }

    @GetMapping("/message/list/{statusId}")
    public Response<GetMessageListDto.Response> getMessageList(@PathVariable Long statusId) {
        GetMessageListDto.Response response = messageService.getMessageList(statusId);
        return new Response<>(200, "메세지 목록 조회 완료", response);
    }

    @GetMapping("/message/detail/{messageId}")
    public Response<GetMessageDetailDto.Response> getMessageDetail(@PathVariable Long messageId) {
        GetMessageDetailDto.Response response = messageService.getMessageDetail(messageId);
        return new Response<>(200, "메세지 조회 완료", response);
    }
}
