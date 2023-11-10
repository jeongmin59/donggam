import React from 'react';

const MailFilter = ({ totalMailCount, unreadMailCount, likeMailCount }) => {

  return (
    <div className='text-right text-[14px]'>
      <span className='font-[GmarketSansLight]'>
        전체 <span className="total-count font-[GmarketSansLight]">{totalMailCount}</span> | 
        맘에 듦 <span className="liked-count font-[GmarketSansLight]">{likeMailCount}</span> | 
        안 읽음 <span className="unread-count font-[GmarketSansLight]">{unreadMailCount}</span>
      </span>
    </div>
  );
};

export default MailFilter;
