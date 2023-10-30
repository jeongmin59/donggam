package com.example.backend.service.message;

import com.example.backend.dto.message.GetMessageAndStatusListDto;
import com.example.backend.dto.message.GetMessageDetailDto;
import com.example.backend.dto.message.GetMessageListDto;
import com.example.backend.dto.message.MessageDto;
import com.example.backend.dto.message.SendMessageDto.Request;
import com.example.backend.dto.message.SendMessageDto.Response;
import com.example.backend.entity.mariaDB.Status;
import com.example.backend.entity.mariaDB.member.Member;
import com.example.backend.entity.mariaDB.message.Message;
import com.example.backend.entity.mariaDB.message.MessageBox;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.type.CustomException;
import com.example.backend.repository.mariaDB.MemberRepository;
import com.example.backend.repository.mariaDB.StatusRepository;
import com.example.backend.repository.mariaDB.message.MessageBoxRepository;
import com.example.backend.repository.mariaDB.message.MessageRepository;
import com.example.backend.service.ImageService;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final MemberRepository memberRepository;
    private final StatusRepository statusRepository;
    private final ImageService imageService;

    public Response sendMessage(Long memberId, MultipartFile img, Request request) {
        Member from = memberRepository.findById(memberId).get();
        Member to = memberRepository.findById(request.getMemberId()).get();

        if(from == null || to == null) {
            throw new CustomException("존재하지 않는 유저입니다", ErrorCode.NOT_SAME_DATA_VALUE);
        }

        String imageAddress = imageService.uploadImage(img);

        Message message = messageRepository.save(request.toMessageEnitty(from, to, imageAddress));

        return message.toSendMessageResponse();
    }

    public GetMessageAndStatusListDto.Response getMessageAndStatusList(Long memberId) {
        Member member = memberRepository.findById(memberId).get();
        List<Status> statusList = statusRepository.findAllByMemberId(memberId);

        if(statusList.size() == 0) throw new NoSuchElementException("상태 메세지가 없습니다");

        int last = statusList.size() - 1;
        Status lastStatus = statusList.get(last);
        Long lastStatusId = lastStatus.getId();
        Message message = messageRepository.findByStatusId(lastStatusId);
        return GetMessageAndStatusListDto.Response.builder()
                .message(message.toMessageDto(lastStatus))
                .statusList(statusList.stream().map(Status::toStatusDto).collect(Collectors.toList()))
                .build();
    }

    public GetMessageListDto.Response getMessageList(Long statusId) {
        List<Message> list = messageRepository.findAllByStatusId(statusId);
        List<MessageDto> messageList = list.stream().map(Message::toMessageDtos).collect(Collectors.toList());
        return GetMessageListDto.Response.builder()
                .messageList(messageList)
                .build();
    }

    public GetMessageDetailDto.Response getMessageDetail(Long messageId) {
        Message message = messageRepository.findById(messageId).get();
        if(message == null) {
            throw new CustomException("메세지가 존재하지 않습니다.", ErrorCode.NOT_SAME_DATA_VALUE);
        }
        return message.toMessageDetailDto();
    }
}
