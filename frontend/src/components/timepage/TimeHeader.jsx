import React from "react";

const TimeHeader = ({ currentTime }) => {
  let contentText;
  let titleText;

  if ((currentTime >= 7 && currentTime < 10) || (currentTime >= 11 && currentTime < 14) || (currentTime >= 17 && currentTime < 20)) {
    if (currentTime >= 7 && currentTime < 10) {
      contentText = "일찍 일어나는 새가..피곤하다?!";
      titleText = "아침 하늘 인증하기";
    } else if (currentTime >= 11 && currentTime < 14) {
      contentText = "오.점.뭐?";
      titleText = "점심 시간 자랑하기";
    } else if (currentTime >= 17 && currentTime < 20) {
      contentText = "수고했어 오늘도";
      titleText = "퇴근길 모먼트";
    }
  } else {
    contentText = "이전 시간대 베스트 컷을 확인해보세요!";
    titleText = "명예의 전당✨"
  }

  return (
    <div>
      <h3>{contentText}</h3>
      <h1>{titleText}</h1>
    </div>
  );
};

export default TimeHeader;

