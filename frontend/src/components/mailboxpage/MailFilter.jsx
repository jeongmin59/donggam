import React from 'react';

const MailFilter = ({ mailList }) => {
  const unReadMails = mailList && mailList.length > 0 ? mailList.filter((mail) => !mail.isRead) : 0;
  const likedMails = mailList && mailList.length > 0 ? mailList.filter((mail) => mail.isLiked) : 0;

  return (
    <div className='text-right'>
      <span className='font-[GmarketSansLight]'>
        전체 <span className="total-count font-[GmarketSansLight]">{mailList.length}</span> | 
        맘에 듦 <span className="liked-count font-[GmarketSansLight]">{likedMails.length}</span> | 
        안 읽음 <span className="unread-count font-[GmarketSansLight]">{unReadMails.length}</span>
      </span>
    </div>
  );
};

export default MailFilter;
