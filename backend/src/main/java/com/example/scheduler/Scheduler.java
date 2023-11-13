package com.example.scheduler;

import com.example.backend.entity.mariaDB.time.Image;
import com.example.backend.repository.mariaDB.image.ImageRepository;
import java.util.Date;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
@Component
@Slf4j
@RequiredArgsConstructor
public class Scheduler {

    private final ImageRepository imageRepository;
    // 일정 주기마다 실행될 로직 작성

    // 매일 오전 7시, 오전 11시, 오후 5시에 실행될 작업
    // 사진 목록 삭제(초기화)
    @Scheduled(cron = "0 0 7,11,17 * * *")
    public void deactivateImages() {
        log.info("사진 삭제 스케줄러 실행");
        List<Image> activeImages = imageRepository.findByIsActiveTrue();
        for (Image image : activeImages) {
            image.setIsActive(false);
            imageRepository.save(image);
        }
    }

    // TimeZone 확인
//    @Scheduled(fixedDelay = 1000)
//    public void alert() {
//        log.info("현재 시간 : {}", new Date());
//    }

    // 매주 월요일 오전 6시 59분에 isActive가 false인 사진들 삭제
//  @Scheduled(cron = "59 6 * * MON")
//  public void deleteImages() {
//    List<Image> deleteImages = imageRepository.findAllByIsActiveFalse();
//    for (Image image : deleteImages) {
//
//    }
//  }
}
