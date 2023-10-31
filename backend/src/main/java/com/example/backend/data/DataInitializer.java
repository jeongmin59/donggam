package com.example.backend.data;

import com.example.backend.entity.postgreSQL.LandMarkLocation;
import com.example.backend.repository.postgreSQL.LandMarkLocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

  private final LandMarkLocationRepository landMarkLocationRepository;

  @Override
  public void run(String... args) throws Exception {
    initializeLandMarkData();
  }

  private void initializeLandMarkData() {
    if (checkData(landMarkLocationRepository)) {
      return ;
    }
    String[] names = {"SSAFY 서울 캠퍼스", "SSAFY 대전 캠퍼스", "SSAFY 광주 캠퍼스", "SSAFY 구미 캠퍼스", "SSAFY 부울경 캠퍼스"};
    Double[] latitudes = {37.501274, 36.354936, 35.204205, 36.108211, 35.096476};
    Double[] longitudes = {127.039623, 127.298279, 126.807260, 128.414057, 128.853635};

    for (int i=0; i<5; i++) {
      landMarkLocationRepository.save(LandMarkLocation.builder()
          .name(names[i])
          .latitude(latitudes[i])
          .longitude(longitudes[i])
          .build());
    }
  }

  private <T> boolean checkData(JpaRepository<T, Long> repository) {
    return repository.existsById(1L);
  }
}
