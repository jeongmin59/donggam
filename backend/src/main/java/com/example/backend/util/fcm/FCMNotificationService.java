package com.example.backend.util.fcm;

import com.example.backend.entity.mariaDB.member.Member;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.type.CustomException;
import com.example.backend.repository.mariaDB.member.MemberRepository;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class FCMNotificationService {

    private final FirebaseMessaging firebaseMessaging;
    private final MemberRepository memberRepository;

    public String sendNotificationByToken(FCMNotificationRequestDto request) {
        Member member = memberRepository.findById(request.getMemberId())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND.getMessage(), ErrorCode.USER_NOT_FOUND));

        if (member.getFirebaseToken() != null) {
            Notification notification = Notification.builder()
                    .setTitle(request.getTitle())
                    .setBody(request.getBody())
                    .build();

            Message message = Message.builder()
                    .setToken(member.getFirebaseToken())
                    .setNotification(notification)
                    .build();

            try {
                firebaseMessaging.send(message);
                System.out.println(member.getNickname() + "에게 알림 전송 성공");
                return member.getNickname() + "에게 알림 전송 성공";
            } catch (FirebaseMessagingException e) {
                return member.getNickname() + "에게 알림 전송 실패, Error : " + e;
            }
        }

        return "Firebase Token 미등록된 유저";
    }
}
