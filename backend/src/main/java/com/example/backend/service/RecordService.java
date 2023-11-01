package com.example.backend.service;

import com.example.backend.dto.record.RecordCommentDto;
import com.example.backend.dto.record.RecordDetailDto;
import com.example.backend.entity.mariaDB.member.Member;
import com.example.backend.entity.mariaDB.space.Record;
import com.example.backend.entity.mariaDB.space.RecordComment;
import com.example.backend.entity.postgreSQL.RecordLocation;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.type.CustomException;
import com.example.backend.repository.mariaDB.MemberRepository;
import com.example.backend.repository.mariaDB.record.RecordCommentRepository;
import com.example.backend.repository.mariaDB.record.RecordRepository;
import com.example.backend.repository.postgreSQL.RecordLocationRepository;
import java.io.IOException;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class RecordService {

    private final ImageService imageService;
    private final MemberRepository memberRepository;
    private final RecordRepository recordRepository;
    private final RecordLocationRepository recordLocationRepository;
    private final RecordCommentRepository recordCommentRepository;

    public RecordDetailDto.Response createRecord(Long memberId, RecordDetailDto.Request request, MultipartFile image)
            throws IOException {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() ->new CustomException(ErrorCode.USER_NOT_FOUND.getMessage(), ErrorCode.USER_NOT_FOUND));

        String imageAddress = null;
        if (image != null) {
            imageAddress = imageService.uploadImage(image, "record");
        }

        Record record = recordRepository.save(Record.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .imageAddress(imageAddress)
                .createdAt(LocalDateTime.now())
                .member(member)
                .build());

        RecordLocation recordLocation = recordLocationRepository.save(RecordLocation.builder()
                .id(record.getId())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .build());

        return RecordDetailDto.toDetailDto(record, recordLocation);
    }

    public RecordCommentDto.Response createComment(Long memberId, Long recordId, String content) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND.getMessage(), ErrorCode.USER_NOT_FOUND));

        Record record = recordRepository.findById(recordId)
                .orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND.getMessage(), ErrorCode.ENTITY_NOT_FOUND));

        RecordComment recordComment = recordCommentRepository.save(RecordComment.builder()
                .content(content)
                .createdAt(LocalDateTime.now())
                .member(member)
                .record(record)
                .build());

        return RecordCommentDto.toCommentDto(recordComment);

    }
}
