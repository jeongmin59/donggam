package com.example.backend.entity.mariaDB.status;

public enum Emotion {
  POSITIVE,
  NEUTRAL,
  NEGATIVE;

  public static Emotion StringToEnum(String text) {
    return Emotion.valueOf(text.toUpperCase());
  }
}
