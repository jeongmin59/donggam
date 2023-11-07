import React from 'react';
import DateTimeFormatter from '../../../utils/date';

const CommentItem = (commentItem) => {
  const content = commentItem.comment.content
  const date = commentItem.comment.createdAt

  //날짜 형식 변경
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;



  return (
    <div className='w-full px-4 py-2  border-2 border-[#ABCEF2] rounded-[16px] ' >
      <h3 className='text-left'>{content}</h3>
      <h5 className='text-right'>{formattedDate}</h5>
    </div>
  );
};

export default CommentItem;