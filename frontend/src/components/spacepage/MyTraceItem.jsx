import React from 'react';
import { Link } from 'react-router-dom';
import DateTimeFormatter from './../../utils/date';
import CreateButton from './../common/CreateButton';

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
  };

  return (
    <Link className='z-0' to={`/space/trace/${traceId}`} >
      <div style={backgroundStyle} className='rounded-[16px] my-2 text-white flex justify-center items-center'>
        <div className='flex-col items-center justify-center space-y-2'>
          <DateTimeFormatter className='text-center' dateTimeString={date} />
          <div className='text-center'>{title}</div>
        </div>
        {/* 버튼 눌렀을 때 영역이 안잡히는 거 같음.. */}
        <CreateButton className='z-10' to='/' />
      </div>
    </Link>
  );
};

export default MyTraceItem;