package com.example.backend.entity.mariaDB.space;

import com.example.backend.dto.landmark.SearchLandmarkDto;
import com.example.backend.entity.postgreSQL.LandMarkLocation;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
@Table(name = "land_mark")
public class LandMark {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private String name;

  @Column
  private String imageAddress;

  // 랜드마크에 달린 방명록 목록
  @OneToMany(mappedBy = "landMark", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
  private List<LandMarkRecord> records;

  @Builder
  public LandMark (String name, String imageAddress) {
    this.name = name;
    this.imageAddress = imageAddress;
  }

  public SearchLandmarkDto.Response toSearchLandMarkDto(LandMarkLocation landMarkLocation) {
    return SearchLandmarkDto.Response.builder()
            .landMarkId(this.getId())
            .imgUrl(this.getImageAddress())
            .name(this.getName())
            .latitude(landMarkLocation.getLatitude())
            .longitude(landMarkLocation.getLongitude())
            .build();
  }
}
