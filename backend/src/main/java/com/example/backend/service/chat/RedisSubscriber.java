package com.example.backend.service.chat;

import com.example.backend.dto.chat.SendChatMessageDto;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.type.CustomException;
import com.example.backend.type.MessageType;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class RedisSubscriber implements MessageListener {
    private final ObjectMapper objectMapper;
    private final RedisTemplate redisTemplate;
    private final SimpMessageSendingOperations messagingTemplate;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            String publishMessage = (String) redisTemplate.getStringSerializer().deserialize(message.getBody());

            SendChatMessageDto.Request request = objectMapper.readValue(publishMessage, SendChatMessageDto.Request.class);

            if (request.getType().equals(MessageType.TALK)) {
                SendChatMessageDto.Response response = request.toResponse();
                messagingTemplate.convertAndSend("/sub/chat/room/" + request.getRoomId(), response);
            }
        } catch (Exception e) {
            throw new CustomException("메세지 전송 실패", ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }
}
