package com.example.backend.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

  INVALID_INPUT_VALUE(400, "Invalid Input Value"),
  METHOD_NOT_ALLOWED(405, "Invalid Input Value"),
  ENTITY_NOT_FOUND(404,"Entity Not Found"),
  USER_NOT_FOUND(404, "User Not Found"),
  INTERNAL_SERVER_ERROR(500, "Server Error"),
  INVALID_TYPE_VALUE(400, "Invalid Type Value"),
  ENUM_MISS_MATCH(501, "enum miss match"),
  DUPLICATE_DB_VALUE(409, "duplicated input value"),
  NOT_SAME_DATA_VALUE(400, "Not Same Data Input Value From DB"),
  FORBIDDEN(403, "Denied Error"),
  UNAUTHORIZED_ERROR(401, "Unauthorized Error");

  private final int status;
  private final String message;

}
