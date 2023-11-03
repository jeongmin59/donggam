package com.example.backend.service;

import com.example.backend.dto.image.ImageDetailDto;
import com.example.backend.dto.image.ImageDto;
import com.example.backend.dto.image.ImageLikeDto;
import com.example.backend.entity.mariaDB.member.Member;
import com.example.backend.entity.mariaDB.time.Image;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.type.CustomException;
import com.example.backend.repository.mariaDB.image.CustomImageRepository;
import com.example.backend.repository.mariaDB.image.ImageRepository;
import com.example.backend.repository.mariaDB.member.MemberRepository;
import com.example.backend.util.ImageUtil;
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
public class TimeService {

    private final ImageUtil imageUtil;
    private final MemberRepository memberRepository;
    private final ImageRepository imageRepository;
    private final CustomImageRepository customImageRepository;

    public void postImage(Long memberId, MultipartFile img, String title) throws IOException {

        String imageAddress = imageUtil.uploadImage(img, "exhibition");

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND.getMessage(),
                        ErrorCode.USER_NOT_FOUND));

        imageRepository.save(Image.builder()
                .imageAddress(imageAddress)
                .title(title)
                .createdAt(LocalDateTime.now())
                .author(member)
                .isActive(true)
                .build());
    }

    public List<ImageDto.Response> getImages(Long memberId) {
        List<Image> images = customImageRepository.findAllByIsActive(true);
        if (images.isEmpty()) {
            return Collections.emptyList();
        }

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND.getMessage(),
                        ErrorCode.USER_NOT_FOUND));

        return images.stream().map(image ->
                        ImageDto.Response.builder()
                                .imageAddress(image.getImageAddress())
                                .title(image.getTitle())
                                .isLiked(image.getLikeMember().contains(member))
                                .imageId(image.getId())
                                .build())
                .collect(Collectors.toList());
    }

    public ImageDetailDto.Response getImage(Long memberId, Long imageId) {
        Image image = customImageRepository.findByIdAndIsActive(imageId, true);

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND.getMessage(),
                        ErrorCode.USER_NOT_FOUND));

        return ImageDetailDto.Response.builder()
                .authorId(image.getAuthor().getId())
                .authorCharacterId(image.getAuthor().getCharacterId())
                .imageAddress(image.getImageAddress())
                .title(image.getTitle())
                .likeCount(image.getLikeMember().size())
                .isLiked(image.getLikeMember().contains(member))
                .build();
    }

    public ImageLikeDto.Response likeImage(Long memberId, Long imageId) {
        Image image = customImageRepository.findByIdAndIsActive(imageId, true);

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND.getMessage(),
                        ErrorCode.USER_NOT_FOUND));

        if (image.getLikeMember().contains(member)) {
            image.getLikeMember().remove(member);
            imageRepository.save(image);
        } else {
            image.getLikeMember().add(member);
            imageRepository.save(image);
        }

        return ImageLikeDto.Response.builder()
                .likeCount(image.getLikeMember().size())
                .isLiked(image.getLikeMember().contains(member))
                .build();
    }

    public List<ImageDto.Response> bestImages(Long memberId) {
        List<Image> images = customImageRepository.findTop3ByIsActiveOrderByLikeMemberDesc(true);
        if (images.isEmpty()) {
            return Collections.emptyList();
        }

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND.getMessage(),
                        ErrorCode.USER_NOT_FOUND));

        Collections.shuffle(images);

        return images.stream().map(image ->
                        ImageDto.Response.builder()
                                .imageAddress(image.getImageAddress())
                                .title(image.getTitle())
                                .isLiked(image.getLikeMember().contains(member))
                                .imageId(image.getId())
                                .build())
                .collect(Collectors.toList());
    }
}
