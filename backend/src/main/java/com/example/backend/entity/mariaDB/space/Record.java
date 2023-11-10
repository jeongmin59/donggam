package com.example.backend.entity.mariaDB.space;

import com.example.backend.entity.mariaDB.member.Member;
import com.example.backend.entity.postgreSQL.RecordLocation;
import com.example.backend.repository.postgreSQL.RecordLocationRepository;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Record {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Column(length = 512)
    private String content;

    @Column
    private String imageAddress;

    @Column
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "record", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private List<RecordComment> comments;

    @Builder
    public Record(String title, String content, String imageAddress, LocalDateTime createdAt, Member member) {
        this.title = title;
        this.content = content;
        this.imageAddress = imageAddress;
        this.createdAt = createdAt;
        this.member = member;
    }

}
