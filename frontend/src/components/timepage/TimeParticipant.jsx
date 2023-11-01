import React, { useState, useEffect } from "react";

const TimeParticipant = () => {
  const [deadline, setDeadline] = useState(null);

  useEffect(() => {
    const now = new Date();

    // 오전 7시, 11시, 오후 5시에 해당하는 마감 시간 설정
    const morningDeadline = new Date(now);
    morningDeadline.setHours(7, 0, 0, 0);

    const lunchDeadline = new Date(now);
    lunchDeadline.setHours(11, 0, 0, 0);

    const eveningDeadline = new Date(now);
    eveningDeadline.setHours(17, 0, 0, 0);

    // 현재 시간 - 마감 시간
    let timeDifference;
    if (now < morningDeadline) {
      timeDifference = morningDeadline - now;
    } else if (now < lunchDeadline) {
      timeDifference = lunchDeadline - now;
    } else if (now < eveningDeadline) {
      timeDifference = eveningDeadline - now;
    } else {
      // 마감 지나고 다음날 오전 7시까지 시간 차이
      const nextMorningDeadline = new Date(now);
      nextMorningDeadline.setDate(nextMorningDeadline.getDate() + 1);
      nextMorningDeadline.setHours(7, 0, 0, 0);
      timeDifference = nextMorningDeadline - now;
    }

    // 시간, 분 변환
    const hoursRemaining = Math.floor(timeDifference / 3600000);
    const minutesRemaining = Math.ceil((timeDifference % 3600000) / 60000);

    // 마감 시간 설정
    setDeadline({ hours: hoursRemaining, minutes: minutesRemaining });
  }, []);

  return (
    <div className="px-5 flex flex-col items-end">
      {/* <h5>몇 명이 참여했는지</h5> */}
      <h5>
        {deadline !== null ? (
          deadline.hours > 0 ? (
            `다음 주제까지 ${deadline.hours}시간 ${deadline.minutes}분`
          ) : (
            `마감까지 ${deadline.hours}시간 ${deadline.minutes}분 남음`
          )
        ) : (
          "마감 시간을 계산 중입니다..."
        )}
      </h5>
    </div>
  );
};

export default TimeParticipant;
