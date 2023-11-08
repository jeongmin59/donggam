import React from 'react';

const TraceItem = ({ time, content, userName, imageUrl }) => {
  const date = new Date(time);
  const formattedDate = date.toLocaleDateString({
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  });

  const backgroundStyle = {
    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), url(${imageUrl}), lightgray 70% / cover no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white'
  };

  const normalBackground = {
    border: '2px solid var(--subColor2, #ABCEF2)',
    backgroundColor: '#FFF',
    color: 'var(--subColor)'
  };

  const hasImageUrl = imageUrl !== null;

  return (
    <div
      style={hasImageUrl ? backgroundStyle : normalBackground}
      className='rounded-[16px] h-[200px] my-5 px-5 flex justify-center items-center'>
      <div className='flex-col items-center justify-center space-y-2'>
        <div className='ownglyph-text text-xl text-center'>{formattedDate}</div>
        <div className='ownglyph-text text-2xl text-center'>{content}</div>
        <div className='ownglyph-text text-xl text-center'>-{userName}의 흔적-</div>
      </div>
    </div>
  );
};

export default TraceItem;
