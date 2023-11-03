package com.example.scheduler;

import com.example.backend.entity.mariaDB.time.Image;
import com.example.backend.repository.mariaDB.image.ImageRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class Scheduler {

  private final ImageRepository imageRepository;
  // 일정 주기마다 실행될 로직 작성

  // 매일 오전 7시, 오전 11시, 오후 5시에 실행될 작업
  // 사진 목록 삭제(초기화)
  @Scheduled(cron = "0 35 7,11,17 * * ?")
  public void deactivateImages() {
    List<Image> activeImages = imageRepository.findAllByIsActive(true);
    for (Image image : activeImages) {
      image.setIsActive(false);
      imageRepository.save(image);
    }
  }

  // 매주 월요일 오전 6시 59분에 isActive가 false인 사진들 삭제
//  @Scheduled(cron = "59 6 * * MON")
//  public void deleteImages() {
//    List<Image> deleteImages = imageRepository.findAllByIsActiveFalse();
//    for (Image image : deleteImages) {
//
//    }
//  }
}
