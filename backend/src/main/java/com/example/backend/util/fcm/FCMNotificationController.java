package com.example.backend.util.fcm;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/firebase")
@Tag(name = "FCM 알림", description = "FCM 알림")
public class FCMNotificationController {
    
    private final FCMNotificationService fcmNotificationService;
    
    @Operation(summary = "푸시 알림 보내기", description = "푸시 알림 보내기")
    @PostMapping
    public String sendNotificationByToken(@RequestBody FCMNotificationRequestDto request) {
        return fcmNotificationService.sendNotificationByToken(request);
    }
}
