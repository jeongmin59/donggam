import React from 'react';

const MailFilter = ({ mailList }) => {
  const unReadMails = mailList.filter((mail) => !mail.isRead);
  const likedMails = mailList.filter((mail) => mail.isLiked);

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
