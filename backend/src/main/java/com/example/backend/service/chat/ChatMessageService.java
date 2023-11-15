package com.example.backend.service.chat;

import com.example.backend.dto.chat.SendChatMessageDto;
import com.example.backend.entity.mariaDB.chat.Chat;
import com.example.backend.entity.mariaDB.chat.ChatRoom;
import com.example.backend.entity.mariaDB.member.Member;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.type.CustomException;
import com.example.backend.repository.mariaDB.chat.CustomChatRoomRepository;
import com.example.backend.repository.mariaDB.member.MemberRepository;
import com.example.backend.repository.mariaDB.chat.ChatRepository;
import com.example.backend.repository.mariaDB.chat.ChatRoomRepository;
import com.example.backend.type.MessageType;
import com.example.backend.util.fcm.FCMNotificationRequestDto;
import com.example.backend.util.fcm.FCMNotificationService;
import java.time.LocalDateTime;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ChatMessageService {

    private final ChatRoomRepository chatRoomRepository;
    private final CustomChatRoomRepository customChatRoomRepository;
    private final ChatRepository chatRepository;
    private final MemberRepository memberRepository;
    private final RedisTemplate redisTemplate;
    private final ChannelTopic channelTopic;
    private final FCMNotificationService fcmNotificationService;

    @Transactional
    public SendChatMessageDto.Response sendMessage(SendChatMessageDto.Request request) {
        ChatRoom chatRoom = customChatRoomRepository.findWithMemberById(request.getRoomId());

        Member member = memberRepository.findById(request.getSenderId()).get();
        if (member == null) {
            throw new CustomException("존재하지 않는 회원입니다.", ErrorCode.USER_NOT_FOUND);
        }

        //채팅 생성 및 저장
        Chat chat = Chat.builder()
                .chatRoom(chatRoom)
                .sender(member)
                .content(request.getContent())
                .createdAt(LocalDateTime.now())
                .isRead(request.getIsRead())
                .build();

        Chat savedChat = chatRepository.save(chat);
        String topic = channelTopic.getTopic();

        chatRoom.setLastChatTime(savedChat.getCreatedAt());
        chatRoomRepository.save(chatRoom);

        // ChatMessageRequest에 유저정보, 현재시간 저장
        request.setSender(member.getNickname());
        request.setSenderId(member.getId());

        if (request.getType() == MessageType.TALK) {
            // 그륩 채팅일 경우
            redisTemplate.convertAndSend(topic, request);
        }

        // FCM 알림 설정
        Long memberId = Objects.equals(chatRoom.getMember1().getId(), request.getSenderId()) ?
                chatRoom.getMember2().getId() : chatRoom.getMember1().getId();
        FCMNotificationRequestDto chatAlert = FCMNotificationRequestDto.builder()
                .memberId(memberId)
                .title(request.getSender())
                .body(request.getContent())
                .build();
        fcmNotificationService.sendNotificationByToken(chatAlert);

        return request.toResponse();
    }

}
