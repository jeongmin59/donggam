package com.example.backend.entity.mariaDB;

import java.util.Objects;

public enum Emotion {
  POSITIVE,
  NEUTRAL,
  NEGATIVE;

  public static Emotion StringToEnum(String text) {
    return Emotion.valueOf(text.toUpperCase());
  }
}
