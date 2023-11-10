import React from 'react';
import { Link } from 'react-router-dom';
import DateTimeFormatter from './../../utils/date';

const MyTraceItem = (traceData) => {
  const traceId = traceData.data.recordId
  const title = traceData.data.title
  const date = traceData.data.createdAt
  const image = traceData.data.imageAddress


  const backgroundStyle = {
    height: '200px',
    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), url(${image}), lightgray 70% / cover no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: 0
  };

  return (
    <>
      <Link to={`/space/trace/${traceId}`} >
        <div style={backgroundStyle} className='rounded-[16px] my-4 text-white flex justify-center items-center'>
          <div className='flex-col items-center justify-center space-y-2'>
            <DateTimeFormatter className='text-center' dateTimeString={date} />
            <div className='text-center'>{title}</div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default MyTraceItem;