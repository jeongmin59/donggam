import React from 'react';

// 2023년 11월 5일 10시 12분
function DateTimeFormatter({ dateTimeString }) {
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
  };

  const formattedDateTime = formatDateTime(dateTimeString);

  return <span>{formattedDateTime}</span>;
}

export default DateTimeFormatter;
