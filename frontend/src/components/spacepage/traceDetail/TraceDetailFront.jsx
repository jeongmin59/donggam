import React from 'react';
import DateTimeFormatter from '../../../utils/date';

const TraceDetailFront = ({ data }) => {
  const title = data.title
  const image = data.imageAddress
  const date = data.createdAt
  const content = data.content

  return (
    <div>
      <img src={image} />
      <h1>{title}</h1>
      <p>날짜 및 시간: <DateTimeFormatter dateTimeString={date} /></p>
      <p>내용 : {content}</p>

    </div>
  );
};

export default TraceDetailFront;