package com.example.backend.entity.postgreSQL;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "land_mark_location")
@Getter
@Setter
public class LandMarkLocation {

  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private Double latitude;

  @Column
  private Double longitude;

}
