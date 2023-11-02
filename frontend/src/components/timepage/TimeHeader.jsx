import React from "react";
import morningImage from "../../assets/timeBackground/morning_sun.png"
import afternoonImage from "../../assets/timeBackground/afternoon_burger.png"
import nightImage from "../../assets/timeBackground/night_planet.png"

const TimeHeader = ({ currentTime }) => {
  let contentText;
  let titleText;
  let image;

  if ((currentTime >= 7 && currentTime < 10) || (currentTime >= 11 && currentTime < 14) || (currentTime >= 17 && currentTime < 20)) {
    if (currentTime >= 7 && currentTime < 10) {
      contentText = "일찍 일어나는 새가..피곤하다?!";
      titleText = "아침 하늘 인증하기";
      image = morningImage

    } else if (currentTime >= 11 && currentTime < 14) {
      contentText = "오.점.뭐?";
      titleText = "점심 시간 자랑하기";
      image =afternoonImage

    } else if (currentTime >= 17 && currentTime < 20) {
      contentText = "수고했어~ 오늘도...~";
      titleText = "퇴근길 모먼트";
      image = nightImage
    
    }
  } else {
    contentText = "이전 시간대 베스트 컷을 확인해보세요!";
    titleText = "명예의 전당✨";
  }

  return (
    <div className="px-5 flex flex-row justify-between">
      <div className="flex flex-col justify-end">
        <h4>{contentText}</h4>
        <h2>{titleText}</h2>
      </div>
      {image && (
        <div className="">
          <img 
            src={image} 
            alt="시간대에 따른 이미지"
            className="w-20 h-20" />
        </div>
      )}
    </div>
  );
};

export default TimeHeader;

