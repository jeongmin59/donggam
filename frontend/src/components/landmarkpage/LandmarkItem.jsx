import React from 'react';

const TraceItem = ({ time, content, userName, imageUrl }) => {
  const date = new Date(time);
  const formattedDate = date.toLocaleDateString({
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  });

  const backgroundStyle = {
    height: '200px',
    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), url(${imageUrl}), lightgray 70% / cover no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    < >
       <div style={backgroundStyle} className='rounded-[16px] my-2 text-white flex justify-center items-center'>
        <div className='flex-col items-center justify-center space-y-2'>
          <div className='text-center'>{formattedDate}</div>
          <div className='text-center'>{content}</div>
          <div className='text-center'>-{userName}의 흔적-</div>
        </div>
      </div>
    </>
  );
};

export default TraceItem;