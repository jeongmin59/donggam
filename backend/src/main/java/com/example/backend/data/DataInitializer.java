package com.example.backend.data;

import com.example.backend.entity.mariaDB.space.LandMark;
import com.example.backend.entity.postgreSQL.LandMarkLocation;
import com.example.backend.repository.mariaDB.landmark.LandMarkRepository;
import com.example.backend.repository.postgreSQL.LandMarkLocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

  private final LandMarkLocationRepository landMarkLocationRepository;
  private final LandMarkRepository landMarkRepository;

  @Override
  public void run(String... args) throws Exception {
    initializeLandMarkData();
  }

  private void initializeLandMarkData() {
    if (checkData(landMarkRepository)) {
      return ;
    }
    String[] names = {"SSAFY 서울 캠퍼스", "SSAFY 대전 캠퍼스", "SSAFY 광주 캠퍼스", "SSAFY 구미 캠퍼스", "SSAFY 부울경 캠퍼스"};
    String[] imageAddresses = {"https://french-fries.s3.ap-northeast-2.amazonaws.com/landmark/7c3f5625-a20a-4dd0-a1b6-0704d46f735d1698974090878ssafy-seoul.png",
            "https://french-fries.s3.ap-northeast-2.amazonaws.com/landmark/23f5ceb0-16e1-4004-9ec8-216925f7884d1698974139475ssafy-daejeon.png",
            "https://french-fries.s3.ap-northeast-2.amazonaws.com/landmark/1bb7b702-3ee6-4af6-bb15-6e9d03d1a9811698974159546ssafy-gwangju.jpg",
            "https://french-fries.s3.ap-northeast-2.amazonaws.com/landmark/1538b7bf-1101-442a-94f4-c91440277c3e1698974167226ssafy-gumi.png",
            "https://french-fries.s3.ap-northeast-2.amazonaws.com/landmark/48a8b59b-ef77-4db2-83b4-f423bba7498b1698974175065ssafy-buk.jpg"};
    Double[] latitudes = {37.501274, 36.354936, 35.204205, 36.108211, 35.096476};
    Double[] longitudes = {127.039623, 127.298279, 126.807260, 128.414057, 128.853635};

    for (int i=0; i<5; i++) {
      LandMark landMark = landMarkRepository.save(LandMark.builder()
          .name(names[i])
          .imageAddress(imageAddresses[i])
          .build());

      landMarkLocationRepository.save(LandMarkLocation.builder()
          .id(landMark.getId())
          .latitude(latitudes[i])
          .longitude(longitudes[i])
          .build());
    }
  }

  private <T> boolean checkData(JpaRepository<T, Long> repository) {
    return repository.existsById(1L);
  }
}
