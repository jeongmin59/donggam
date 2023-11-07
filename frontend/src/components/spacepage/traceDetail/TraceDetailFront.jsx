import React from 'react';
import TraceDetailTitle from './TraceDetailTitle';
import DateTimeFormatter from '../../../utils/date';

const TraceDetailFront = ({ data }) => {
  const title = data.title
  const image = data.imageAddress
  const date = data.createdAt
  const content = data.content

  const newDate = DateTimeFormatter(date)



  return (
    <div>
      <img className="trace-image" src={image} />
      <TraceDetailTitle title={title} content={newDate} />
      <div className="trace-content flex items-center justify-center">
        <h4 className='text-center ownglyph-text w-[70%]'>{content}</h4>
      </div>
    </div>
  );
};

export default TraceDetailFront;