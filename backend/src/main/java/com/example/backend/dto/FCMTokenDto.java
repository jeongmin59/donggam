package com.example.backend.dto;

import lombok.Data;

@Data
public class FCMTokenDto {

    @Data
    public static class Request {
        private String firebaseToken;
    }

}
