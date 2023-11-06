import React from 'react';
import TraceDetailTitle from './TraceDetailTitle';

const TraceDetailFront = ({ data }) => {
  const title = data.title
  const image = data.imageAddress
  const date = data.createdAt;
  const content = data.content

  return (
    <div>
      <img className="w-96 h-72" src={image} />
      <TraceDetailTitle title={title} content={date} />
      <div className="w-96 h-72">{content}</div>
    </div>
  );
};

export default TraceDetailFront;