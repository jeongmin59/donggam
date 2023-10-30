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

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "member_location")
@Getter
@Setter
public class MemberLocation {
  @Id
  private Long id;

  @Column
  private Double latitude;

  @Column
  private Double longitude;

  @Builder
  public MemberLocation(Long id, Double latitude, Double longitude){
    this.id = id;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
