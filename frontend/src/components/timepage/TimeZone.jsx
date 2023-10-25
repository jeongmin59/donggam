import React, { useState, useEffect } from "react";

const TimeZone = () => {
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const hour = now.getHours();

      // 월, 일, 시간이 한 자리 숫자일 때 0 붙이기
      const formattedMonth = month < 10 ? `0${month}` : month;
      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedHour = hour < 10 ? `0${hour}` : hour;

      const dateTimeString = `${formattedMonth}월 ${formattedDay}일 ${formattedHour}시`;
      setCurrentDateTime(dateTimeString);
    };

    // 초기 로딩 시간 업데이트해줌
    updateDateTime();

    // 매 분마다 시간 업데이트해줌
    const intervalId = setInterval(updateDateTime, 60000);

    return () => {
      clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 해제
    };
  }, []);

  return (
    <div>
      <p>{currentDateTime}</p>
    </div>
  );
};

export default TimeZone;
