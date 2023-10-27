package com.example.backend.entity.postgreSQL;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.locationtech.jts.geom.Point;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "location")
@Getter
@Setter
public class Location {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private Double latitude;

  @Column
  private Double longitude;

  @Builder
  public Location(Double latitude, Double longitude){
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
