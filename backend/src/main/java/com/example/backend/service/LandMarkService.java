package com.example.backend.service;

import com.example.backend.dto.landmark.LandMarkRecordDto;
import com.example.backend.entity.mariaDB.member.Member;
import com.example.backend.entity.mariaDB.space.LandMark;
import com.example.backend.entity.mariaDB.space.LandMarkRecord;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.type.CustomException;
import com.example.backend.repository.mariaDB.landmark.LandMarkRecordCommentRepository;
import com.example.backend.repository.mariaDB.landmark.LandMarkRecordRepository;
import com.example.backend.repository.mariaDB.landmark.LandMarkRepository;
import com.example.backend.repository.mariaDB.MemberRepository;
import com.example.backend.repository.postgreSQL.LandMarkLocationRepository;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class LandMarkService {

  private final MemberRepository memberRepository;
  private final LandMarkRepository landMarkRepository;
  private final LandMarkRecordRepository landMarkRecordRepository;
  private final LandMarkRecordCommentRepository landMarkRecordCommentRepository;
  private final LandMarkLocationRepository landMarkLocationRepository;
  private final ImageService imageService;

  public String createLandMarkRecord(Long memberId, Long landMarkId, String content, MultipartFile image)
      throws IOException {
    Member member = memberRepository.findById(memberId)
        .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND.getMessage(), ErrorCode.USER_NOT_FOUND));

    LandMark landMark = landMarkRepository.findById(landMarkId)
        .orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND.getMessage(), ErrorCode.ENTITY_NOT_FOUND));

    String imageAddress = null;
    if (image != null) {
      imageAddress = imageService.uploadImage(image, "landmark-record");
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
    LandMark landMark = landMarkRepository.findById(landMarkId)
        .orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND.getMessage(), ErrorCode.ENTITY_NOT_FOUND));

    if (landMark.getRecords() == null) {
      return Collections.emptyList();
    }

    return landMark.getRecords().stream().map(record ->
        LandMarkRecordDto.Response.builder()
            .recordId(record.getId())
            .content(record.getContent() == null ? null : record.getImageAddress())
            .imageAddress(record.getImageAddress() == null ? null : record.getImageAddress())
            .authorId(record.getMember().getId())
            .build())
        .collect(Collectors.toList());
  }
}
