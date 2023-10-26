// 같은 시간, 다른 공간 페이지 배경
import React, { useEffect, useState } from "react";
import HeaderTemplate from "./HeaderTemplate";

const TimeBackground = () => {
  const [timeClass, setTimeClass] = useState("bg-gradient-to-b from-blue-200 to-white");
  const [currentTime, setCurrentTime] = useState(new Date().getHours());  // 현재 시간 상태로 관리

  useEffect(() => {
    setCurrentTime(new Date().getHours());
    console.log("현재 시간은??", currentTime);

    if ((currentTime >= 7 && currentTime < 10) || (currentTime >= 11 && currentTime < 14) || (currentTime >= 17 && currentTime < 20)) {
      // 오전 7시~10시, 오전 11시~오후 2시, 오후 5시~8시에 배경색 변경
      if (currentTime >= 7 && currentTime < 10) {
        setTimeClass("bg-gradient-to-b from-blue-200 to-white");    // 하늘색
      } else if (currentTime >= 11 && currentTime < 14) {
        setTimeClass("bg-gradient-to-b from-orange-200 to-white");  // 주황빛 도는 색
      } else if (currentTime >= 17 && currentTime < 20) {
        setTimeClass("bg-gradient-to-b from-blue-900 to-white");    // 남색
      }
    } else {
      // 그 외 시간대에는 연두색 배경 사용
      setTimeClass("bg-gradient-to-b from-lime-200 to-white");
    }
  }, [currentTime]);

  return (
    <div className="h-[25vh] overflow-hidden">
      <div className={`pt-5 h-full ${timeClass}`}>
        <HeaderTemplate currentTime={ currentTime } />
      </div>
    </div>
  );
};

export default TimeBackground;


