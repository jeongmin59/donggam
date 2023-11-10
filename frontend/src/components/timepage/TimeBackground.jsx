import React, { useEffect, useState } from "react";
import TimeHeaderTemplate from "./TimeHeaderTemplate";

const TimeBackground = ({ currentTime, totalParticipants, isBestTime, remainTime }) => {
  const [timeClass, setTimeClass] = useState("bg-gradient-to-b from-blue-200 to-white");

  useEffect(() => {
    if (!isBestTime) {
      // 오전 7시~10시, 오전 11시~오후 2시, 오후 5시~8시에 배경색 변경
      if (currentTime >= 7 && currentTime < 10) {
        setTimeClass("bg-gradient-to-b from-blue-200 to-white");    // 하늘색
      } else if (currentTime >= 11 && currentTime < 14) {
        setTimeClass("bg-gradient-to-b from-orange-200 to-white");  // 주황빛 도는 색
      } else if (currentTime >= 17 && currentTime < 20) {
        setTimeClass("bg-gradient-to-b from-indigo-400 to-white");    // 남색
      }
    } else {
      // 그 외 시간대에는 연두색 배경 사용
      setTimeClass("bg-gradient-to-b from-lime-200 to-white");
    }
  }, [currentTime]);

  return (
    <div className="h-[25vh] overflow-hidden">
      <div className={`pt-5 h-full ${timeClass}`}>
        <TimeHeaderTemplate currentTime={currentTime} />
        <div className = "float-right px-5 text-right">
          {isBestTime ? (
            <div >
              <h5>총 {totalParticipants}명이 참여했어요!</h5>
              <h5>개장까지 {remainTime} 전</h5>
            </div>
          ) : (
            <div>
              <h5>총 {totalParticipants}명이 참여중이에요!</h5>
              <h5>마감까지 {remainTime} 전</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeBackground;
