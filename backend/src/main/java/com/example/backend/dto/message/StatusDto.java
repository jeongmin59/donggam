package com.example.backend.dto.message;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StatusDto {
    private Long id;
    private String status;
}
