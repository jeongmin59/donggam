package com.example.backend.dto.message;

import com.example.backend.entity.mariaDB.Status;
import com.example.backend.entity.mariaDB.member.Member;
import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Data;

@Data
public class GetMessageDetailDto {

    @Data
    @Builder
    public static class Response {
        private Long id;
        private String content;
        private String imgAddress;
        private LocalDate localDate = LocalDate.now();
        private String from;
    }
}
