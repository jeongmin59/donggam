package com.example.backend.service;

import com.example.backend.dto.record.RecordCommentDto;
import com.example.backend.dto.record.RecordDetailDto;
import com.example.backend.dto.record.RecordDto;
import com.example.backend.entity.mariaDB.member.Member;
import com.example.backend.entity.mariaDB.space.Record;
import com.example.backend.entity.mariaDB.space.RecordComment;
import com.example.backend.entity.postgreSQL.MemberLocation;
import com.example.backend.entity.postgreSQL.RecordLocation;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.type.CustomException;
import com.example.backend.repository.mariaDB.member.MemberRepository;
import com.example.backend.repository.mariaDB.record.CustomRecordRepository;
import com.example.backend.repository.mariaDB.record.RecordCommentRepository;
import com.example.backend.repository.mariaDB.record.RecordRepository;
import com.example.backend.repository.postgreSQL.MemberLocationRepository;
import com.example.backend.repository.postgreSQL.RecordLocationRepository;
import com.example.backend.util.ImageUtil;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class RecordService {

    private final ImageUtil imageUtil;
    private final MemberRepository memberRepository;
    private final MemberLocationRepository memberLocationRepository;
    private final RecordRepository recordRepository;
    private final CustomRecordRepository customRecordRepository;
    private final RecordLocationRepository recordLocationRepository;
    private final RecordCommentRepository recordCommentRepository;

    public RecordDetailDto.Response createRecord(Long memberId, RecordDetailDto.Request request, MultipartFile image)
            throws IOException {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() ->new CustomException(ErrorCode.USER_NOT_FOUND.getMessage(), ErrorCode.USER_NOT_FOUND));

        String imageAddress = null;
        if (image != null) {
            imageAddress = imageUtil.uploadImage(image, "record");
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

    public List<RecordDto.Response> aroundRecords(Long memberId) {
        MemberLocation location = memberLocationRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND.getMessage(), ErrorCode.USER_NOT_FOUND));

        List<RecordLocation> recordLocations = recordLocationRepository.findWithinRadius(location.getLatitude(),
                location.getLongitude(), 10000d);

        List<Long> locationIds = recordLocations.stream().map(RecordLocation::getId)
                .collect(Collectors.toList());

        List<Record> records = recordRepository.findByIdIn(locationIds);

        return records.stream().map(RecordDto::toRecordDto)
                .collect(Collectors.toList());
    }

    public RecordDetailDto.Response record(Long recordId) {
        Record record = customRecordRepository.findById(recordId)
                .orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND.getMessage(), ErrorCode.ENTITY_NOT_FOUND));

        RecordLocation recordLocation = recordLocationRepository.findById(recordId)
                .orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND.getMessage(), ErrorCode.ENTITY_NOT_FOUND));

        return RecordDetailDto.toDetailDto(record, recordLocation);
    }
}
