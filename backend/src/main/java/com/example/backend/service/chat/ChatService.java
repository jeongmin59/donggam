package com.example.backend.service.chat;

import com.example.backend.dto.chat.ChatDto;
import com.example.backend.dto.chat.InviteChatDto;
import com.example.backend.dto.chat.InviteChatDto.Request;
import com.example.backend.entity.mariaDB.chat.Chat;
import com.example.backend.entity.mariaDB.chat.ChatRoom;
import com.example.backend.entity.mariaDB.member.Member;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.type.CustomException;
import com.example.backend.repository.mariaDB.member.MemberRepository;
import com.example.backend.repository.mariaDB.chat.ChatRepository;
import com.example.backend.repository.mariaDB.chat.ChatRoomRepository;
import com.example.backend.util.fcm.FCMNotificationRequestDto;
import com.example.backend.util.fcm.FCMNotificationService;
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
    private final FCMNotificationService fcmNotificationService;

    public List<ChatDto.Response> getChatList(Long roomId) {
        List<Chat> chatList = chatRepository.findAllByChatRoomId(roomId);

        List<Chat> readChatList = chatList.stream().map(chat -> {
            if (!chat.getIsRead()) {
                chat.setIsRead(true);
                return chatRepository.save(chat);
            } else {
                return chat;
            }
        }).collect(Collectors.toList());

        return readChatList.stream().map(ChatDto::toDto)
                .collect(Collectors.toList());
    }

    public InviteChatDto.Response inviteChat(Request request, Long memberId) {
        // 상대방
        Member member1 = memberRepository.findById(request.getMemberId()).get();
        // 나
        Member member2 = memberRepository.findById(memberId).get();

        if (member1 == null || member2 == null) {
            throw new CustomException("존재하지 않는 유저입니다.", ErrorCode.USER_NOT_FOUND);
        }

        ChatRoom chatRoom1 = chatRoomRepository.findByMember1IdAndMember2Id(member1.getId(), member2.getId()).orElse(null);
        ChatRoom chatRoom2 = chatRoomRepository.findByMember1IdAndMember2Id(member2.getId(), member1.getId()).orElse(null);

        // 이미 해당 회원과 같이 참여된 채팅방이 있을 경우
        if (chatRoom1 != null) {
            return InviteChatDto.toDto(chatRoom1);
        } else if (chatRoom2 != null) {
            return InviteChatDto.toDto(chatRoom2);
        } else {
            // 처음 채팅하는 사람일 경우
            ChatRoom chatRoom = chatRoomRepository.save(ChatRoom.builder()
                    .member1(member1)
                    .member2(member2)
                    .isMember1Active(true)
                    .isMember2Active(true)
                    .build());

            FCMNotificationRequestDto chatRoomAlert = FCMNotificationRequestDto.builder()
                    .memberId(member1.getId())
                    .title("새로운 만남의 시작")
                    .body(member2.getNickname() + "에게서 대화를 신청받았어요.")
                    .build();

            fcmNotificationService.sendNotificationByToken(chatRoomAlert);

            return InviteChatDto.toDto(chatRoom);
        }
    }
}
