import React from 'react';
import TraceDetailTitle from './TraceDetailTitle';

const TraceDetailFront = ({ data }) => {
  const title = data.title
  const image = data.imageAddress
  const date = data.createdAt
  const content = data.content

  //날짜 형식 변경
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const formattedDate = `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;




  return (
    <div>
      <img className="trace-image" src={image} />
      <TraceDetailTitle title={title} content={formattedDate} />
      {/* <div className="landmark-card"> */}
      <div className="trace-content flex items-center justify-center">
        <h4 className='text-center ownglyph-text text-xl w-[70%]'>{content}</h4>
      </div>
    </div>
  );
};

export default TraceDetailFront;