package com.example.backend.exception.type;

import com.example.backend.exception.ErrorCode;
import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {

  private ErrorCode errorCode;

  public CustomException(String message, ErrorCode errorCode) {
    super(errorCode.getStatus() + " " +message);
    this.errorCode = errorCode;
  }
}
