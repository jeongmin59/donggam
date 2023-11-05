package com.example.backend.service.chat;

import com.example.backend.dto.chat.SendChatMessageDto;
import com.example.backend.entity.mariaDB.chat.Chat;
import com.example.backend.entity.mariaDB.chat.ChatRoom;
import com.example.backend.entity.mariaDB.member.Member;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.type.CustomException;
import com.example.backend.repository.mariaDB.member.MemberRepository;
import com.example.backend.repository.mariaDB.chat.ChatRepository;
import com.example.backend.repository.mariaDB.chat.ChatRoomRepository;
import com.example.backend.type.MessageType;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChatMessageService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatRepository chatRepository;
    private final MemberRepository memberRepository;
    private final RedisTemplate redisTemplate;
    private final ChannelTopic channelTopic;

    @Transactional
    public SendChatMessageDto.Response sendMessage(SendChatMessageDto.Request request) {
        ChatRoom chatRoom = chatRoomRepository.findById(request.getRoomId()).get();
        if (chatRoom == null) {
            throw new CustomException("존재하지 않는 채팅방입니다.", ErrorCode.NOT_SAME_DATA_VALUE);
        }
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
                .build();

        chatRepository.save(chat);
        String topic = channelTopic.getTopic();

        chatRoom.setLastChatTime(chat.getCreatedAt());

        // ChatMessageRequest에 유저정보, 현재시간 저장
        request.setSender(member.getNickname());
        request.setSenderId(member.getId());

        if (request.getType() == MessageType.TALK) {
            // 그륩 채팅일 경우
            redisTemplate.convertAndSend(topic, request);
        }
        return request.toResponse();
    }

}
