package com.example.backend.service.chat;

import com.example.backend.dto.chat.GetRoomListDto;
import com.example.backend.dto.chat.RoomDto;
import com.example.backend.entity.mariaDB.chat.ChatRoom;
import com.example.backend.entity.mariaDB.member.Member;
import com.example.backend.repository.mariaDB.member.MemberRepository;
import com.example.backend.repository.mariaDB.chat.ChatRoomRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final MemberRepository memberRepository;

    public GetRoomListDto.Response getRoomList(Long memberId) {
        Member member = memberRepository.findById(memberId).get();
        List<ChatRoom> chatRoomList = chatRoomRepository.findAllByMemberId(memberId);
        List<RoomDto> chatRoomDtoList = chatRoomList.stream()
                .map(chatRoom -> chatRoom.toRoomDto(member)).collect(
                        Collectors.toList());
        return GetRoomListDto.Response.builder()
                .roomList(chatRoomDtoList)
                .build();
    }
}
