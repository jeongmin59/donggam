package com.example.backend.service.chat;

import com.example.backend.dto.chat.ChatDto;
import com.example.backend.dto.chat.GetChatListDto;
import com.example.backend.entity.mariaDB.chat.Chat;
import com.example.backend.repository.mariaDB.chat.ChatRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;

    public GetChatListDto.Response getChatList(Long roomId) {
        List<Chat> chatList = chatRepository.findAllByChatRoomId(roomId);
        List<ChatDto> chatDtoList = chatList.stream().map(Chat::toChatDto).collect(Collectors.toList());
        return GetChatListDto.Response.builder()
                .chatList(chatDtoList)
                .build();
    }
}
