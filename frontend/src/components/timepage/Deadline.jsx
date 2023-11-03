import React, { useState, useEffect } from "react";

const Deadline = () => {
  const [deadline, setDeadline] = useState(null);

  useEffect(() => {
    const calculateDeadline = () => {
      const now = new Date();

      // 오전 7시, 11시, 오후 17시에 해당하는 마감 시간 설정
      const morningDeadline = new Date(now);
      morningDeadline.setHours(10, 0, 0, 0);

      const lunchDeadline = new Date(now);
      lunchDeadline.setHours(14, 0, 0, 0);

      const eveningDeadline = new Date(now);
      eveningDeadline.setHours(20, 0, 0, 0);

      // 현재 시간 - 마감 시간
      let timeDifference;
      let nextDeadline;

      if (now < morningDeadline) {
        timeDifference = morningDeadline - now;
        nextDeadline = "오전 10시";
      } else if (now < lunchDeadline) {
        timeDifference = lunchDeadline - now;
        nextDeadline = "오후 2시";
      } else if (now < eveningDeadline) {
        timeDifference = eveningDeadline - now;
        nextDeadline = "오후 8시";
      } else {
        // 마감 지나고 다음날 오전 7시까지 시간 차이
        const nextMorningDeadline = new Date(now);
        nextMorningDeadline.setDate(nextMorningDeadline.getDate() + 1);
        nextMorningDeadline.setHours(7, 0, 0, 0);
        timeDifference = nextMorningDeadline - now;
        nextDeadline = "오전 7시";
      }

      // 시간, 분 변환
      const hoursRemaining = Math.floor(timeDifference / 3600000);
      const minutesRemaining = Math.ceil((timeDifference % 3600000) / 60000);

      // 마감 시간 설정
      setDeadline({ hours: hoursRemaining, minutes: minutesRemaining, nextDeadline });
    };

    calculateDeadline(); // 초기 계산 실행

    const intervalId = setInterval(calculateDeadline, 60000); // 1분마다 계산

    return () => {
      clearInterval(intervalId); // 컴포넌트가 언마운트될 때 인터벌 정리
    };
  }, []);

  return (
    <div className="px-5 flex flex-col items-end">
      <h5>
        {deadline !== null ? (
          `마감까지 ${deadline.hours}시간 ${deadline.minutes}분 남았어요!`
        ) : (
          "시간을 계산 중입니다..."
        )}
      </h5>
    </div>
  );
};

export default Deadline;
