import React from 'react';
import DateTimeFormatter from '../../../utils/date';

const CommentItem = (commentItem) => {
  const content = commentItem.comment.content
  const date = commentItem.comment.createdAt

  //날짜 형식 변경
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const formattedYear = String(year).slice(-2); // 2자릿수 연도 표현
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const formattedDay = (day < 10 ? '0' : '') + day; // 한 자릿수 날일 경우, 06일로 표현
  const hour = newDate.getHours();
  const minute = newDate.getMinutes();
  const formattedDate = `${formattedYear}-${month}-${formattedDay} ${hour}:${minute}`;



  return (
    <div className=' px-4 py-2  border-2 border-[#ABCEF2] rounded-[16px]' >
      <h4 className='text-left text-md'>{content}</h4>
      <h5 className='text-right text-sm'>{formattedDate}</h5>
    </div>
  );
};

export default CommentItem;