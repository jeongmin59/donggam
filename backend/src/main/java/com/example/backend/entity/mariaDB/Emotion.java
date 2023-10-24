package com.example.backend.entity.mariaDB;

import java.util.Objects;

public enum Emotion {
  POSITIVE,
  NEUTRAL,
  NEGATIVE;

  public static Emotion StringToEnum(String text) {
//    if (Objects.equals(text, "negative")) {
//      return NEGATIVE;
//    } else if (Objects.equals(text, "neutral")) {
//      return NEUTRAL;
//    } else {
//      return POSITIVE;
//    }
    return Emotion.valueOf(text.toUpperCase());
  }
}
