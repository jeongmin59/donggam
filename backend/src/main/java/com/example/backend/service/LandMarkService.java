package com.example.backend.service;

import com.example.backend.dto.landmark.LandMarkCommentDto;
import com.example.backend.dto.landmark.LandMarkRecordDto;
import com.example.backend.dto.landmark.SearchLandmarkDto;
import com.example.backend.dto.landmark.SearchLandmarkDto.Request;
import com.example.backend.entity.mariaDB.member.Member;
import com.example.backend.entity.mariaDB.space.LandMark;
import com.example.backend.entity.mariaDB.space.LandMarkRecord;
import com.example.backend.entity.mariaDB.space.LandMarkRecordComment;
import com.example.backend.entity.postgreSQL.LandMarkLocation;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.type.CustomException;
import com.example.backend.repository.mariaDB.landmark.CustomLandMarkRepository;
import com.example.backend.repository.mariaDB.landmark.LandMarkRecordCommentRepository;
import com.example.backend.repository.mariaDB.landmark.LandMarkRecordRepository;
import com.example.backend.repository.mariaDB.landmark.LandMarkRepository;
import com.example.backend.repository.mariaDB.member.MemberRepository;
import com.example.backend.repository.postgreSQL.LandMarkLocationRepository;
import com.example.backend.util.ImageUtil;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class LandMarkService {

    private final MemberRepository memberRepository;
    private final LandMarkRepository landMarkRepository;
    private final CustomLandMarkRepository customLandMarkRepository;
    private final LandMarkRecordRepository landMarkRecordRepository;
    private final LandMarkRecordCommentRepository landMarkRecordCommentRepository;
    private final LandMarkLocationRepository landMarkLocationRepository;
    private final ImageUtil imageUtil;

    public String createLandMarkRecord(Long memberId, Long landMarkId, String content,
            MultipartFile image)
            throws IOException {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND.getMessage(),
                        ErrorCode.USER_NOT_FOUND));

        LandMark landMark = landMarkRepository.findById(landMarkId)
                .orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND.getMessage(),
                        ErrorCode.ENTITY_NOT_FOUND));

        String imageAddress = null;
        if (image != null) {
            imageAddress = imageUtil.uploadImage(image, "landmark-record");
        }

        landMarkRecordRepository.save(LandMarkRecord.builder()
                .content(content)
                .imageAddress(imageAddress)
                .createdAt(LocalDateTime.now())
                .landMark(landMark)
                .member(member)
                .build()
        );

        return "방명록 작성 성공";
    }

    public List<LandMarkRecordDto.Response> landMarkRecords(Long landMarkId) {
        LandMark landMark = customLandMarkRepository.findById(landMarkId)
                .orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND.getMessage(),
                        ErrorCode.ENTITY_NOT_FOUND));

        if (landMark.getRecords() == null) {
            return Collections.emptyList();
        }

        List<LandMarkRecord> records = landMark.getRecords();
        Collections.shuffle(records);

        return records.stream().map(LandMarkRecordDto::toRecordDto)
                .collect(Collectors.toList());
    }

    public LandMarkCommentDto.Response createComment(Long memberId, Long recordId,
            LandMarkCommentDto.Request request) {
        LandMarkRecord landMarkRecord = landMarkRecordRepository.findById(recordId)
                .orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND.getMessage(),
                        ErrorCode.ENTITY_NOT_FOUND));

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND.getMessage(),
                        ErrorCode.USER_NOT_FOUND));

        LandMarkRecordComment comment = landMarkRecordCommentRepository.save(
                LandMarkRecordComment.builder()
                        .content(request.getContent())
                        .createdAt(LocalDateTime.now())
                        .member(member)
                        .record(landMarkRecord)
                        .build());

        return LandMarkCommentDto.toCommentDto(comment);
    }

    public SearchLandmarkDto.Response searchLandmark(Request request) {
        Optional<LandMarkLocation> OptionalLandMarkLocation = landMarkLocationRepository.findNearestWithinRadius(
                request.getLatitude(), request.getLongitude(), 10000d);
        LandMarkLocation landMarkLocation = OptionalLandMarkLocation.orElse(null);

        if (landMarkLocation == null) {
            return null;
        }
        Long landMarkId = landMarkLocation.getId();

        LandMark landMark = landMarkRepository.findById(landMarkId).get();
        return landMark.toSearchLandMarkDto(landMarkLocation);
    }
}
