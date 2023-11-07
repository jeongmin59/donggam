import React from 'react';

const MailFilter = ({ mailList }) => {
  const unReadMails = mailList.filter((mail) => !mail.isRead);
  const likedMails = mailList.filter((mail) => mail.isLiked);

  return (
    <div className='text-right'>
      <h5>전체 {mailList.length} | 맘에 듦 {likedMails.length} | 안 읽음 {unReadMails.length}</h5>
    </div>
  );
};

export default MailFilter;
