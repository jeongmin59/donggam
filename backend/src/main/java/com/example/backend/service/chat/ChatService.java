package com.example.backend.service.chat;

import com.example.backend.dto.chat.ChatDto;
import com.example.backend.dto.chat.GetChatListDto;
import com.example.backend.dto.chat.InviteChatDto.Request;
import com.example.backend.entity.mariaDB.chat.Chat;
import com.example.backend.entity.mariaDB.chat.ChatRoom;
import com.example.backend.entity.mariaDB.member.Member;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.type.CustomException;
import com.example.backend.repository.mariaDB.member.MemberRepository;
import com.example.backend.repository.mariaDB.chat.ChatRepository;
import com.example.backend.repository.mariaDB.chat.ChatRoomRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final MemberRepository memberRepository;

    public GetChatListDto.Response getChatList(Long roomId) {
        List<Chat> chatList = chatRepository.findAllByChatRoomId(roomId);
        List<ChatDto> chatDtoList = chatList.stream().map(Chat::toChatDto)
                .collect(Collectors.toList());
        return GetChatListDto.Response.builder()
                .chatList(chatDtoList)
                .build();
    }

    public void inviteChat(Request request, Long memberId) {
        Member member1 = memberRepository.findById(request.getMemberId()).get();
        Member member2 = memberRepository.findById(memberId).get();

        if (member1 == null || member2 == null) {
            throw new CustomException("존재하지 않는 유저입니다.", ErrorCode.USER_NOT_FOUND);
        }
        ChatRoom chatRoom = ChatRoom.builder()
                .member1(member1)
                .member2(member2)
                .build();
        chatRoomRepository.save(chatRoom);
    }
}
