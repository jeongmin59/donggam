package com.example.backend.service.chat;

import com.example.backend.dto.chat.ChatRoomDto;
import com.example.backend.entity.mariaDB.chat.Chat;
import com.example.backend.entity.mariaDB.chat.ChatRoom;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.type.CustomException;
import com.example.backend.repository.mariaDB.chat.ChatRepository;
import com.example.backend.repository.mariaDB.chat.CustomChatRoomRepository;
import com.example.backend.repository.mariaDB.member.MemberRepository;
import com.example.backend.repository.mariaDB.chat.ChatRoomRepository;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatRepository chatRepository;
    private final CustomChatRoomRepository customChatRoomRepository;

    public List<ChatRoomDto.Response> getRoomList(Long myId) {
        List<ChatRoom> chatRooms = customChatRoomRepository.findAllByMemberIdAndIsMemberActiveTrue(myId);

        return chatRooms.stream()
                .map(room -> {
                    Boolean isActive = true;
                    // 내가 member1이면 member2의 활성화 상태 사용
                    if (Objects.equals(room.getMember1().getId(), myId)) {
                        isActive = room.getIsMember2Active();
                        // 내가 member2면 member1의 활성화 상태 사용
                    } else if (Objects.equals(room.getMember2().getId(), myId)) {
                        isActive = room.getIsMember1Active();
                    }

                    return ChatRoomDto.Response.builder()
                            .roomId(room.getId())
                            .name(Objects.equals(room.getMember1().getId(), myId)
                                    ? room.getMember2()
                                    .getNickname() : room.getMember1().getNickname())
                            .isActive(isActive)
                            .unReadChatCount(
                                    (int) room.getChat().stream().filter(chat -> !chat.getIsRead()).count())
                            .lastChatTime(room.getLastChatTime())
                            .build();
                }).collect(Collectors.toList());
    }

    public List<ChatRoomDto.Response> leaveChat(Long roomId, Long myId) {
        ChatRoom chatRoom = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND.getMessage(),
                        ErrorCode.ENTITY_NOT_FOUND));

        // 해당 채팅방에서 나를 비활성화 시킴
        if (Objects.equals(chatRoom.getMember1().getId(), myId)) {
            chatRoom.setIsMember1Active(false);
        } else if (Objects.equals(chatRoom.getMember2().getId(), myId)) {
            chatRoom.setIsMember2Active(false);
        }

        ChatRoom leftChatRoom = chatRoomRepository.save(chatRoom);

        // 채팅방 중에서 내가 아직 안나간 채팅방만 가져옴
        List<ChatRoom> chatRooms = customChatRoomRepository.findAllByMemberIdAndIsMemberActiveTrue(myId);

        return chatRooms.stream()
                .map(room -> {
                    Boolean isActive = true;
                    if (Objects.equals(room.getMember1().getId(), myId)) {
                        isActive = room.getIsMember2Active();
                    } else if (Objects.equals(room.getMember2().getId(), myId)) {
                        isActive = room.getIsMember1Active();
                    }

                    return ChatRoomDto.Response.builder()
                            .roomId(room.getId())
                            .name(Objects.equals(room.getMember1().getId(), myId)
                                    ? room.getMember2()
                                    .getNickname() : room.getMember1().getNickname())
                            .isActive(isActive)
                            .lastChatTime(room.getLastChatTime())
                            .unReadChatCount(
                                    (int) room.getChat().stream().filter(chat -> !chat.getIsRead()).count())
                            .build();
                }).collect(Collectors.toList());
    }

    public void readChats(Long roomId, Long myId) {
        ChatRoom chatRoom = customChatRoomRepository.findByRoomId(roomId);

        List<Chat> chats = chatRoom.getChat();
        chats.forEach(chat -> {
            if (!Objects.equals(chat.getSender().getId(), myId) && !chat.getIsRead()) {
                chat.setIsRead(true);
                chatRepository.save(chat);
            }
        });
    }
}
