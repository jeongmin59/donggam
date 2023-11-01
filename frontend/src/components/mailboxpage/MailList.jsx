import React from 'react';
import MailItem from './MailItem';

const MailList = (mail) => {
  const mailId = mail.mail.messageId
  return (
    <div>
      <h2>{mail.mail.content}</h2>
      <MailItem mailId={mailId} />
    </div>
  );
};

export default MailList;