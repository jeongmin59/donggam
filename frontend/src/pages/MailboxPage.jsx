import React from 'react';
import Header from '../components/common/Header';
import MailBox from './../components/mailboxpage/MailBox';

const MailboxPage = () => {
  return (
    <div className='chatting h-screen'>
      <Header title="쪽지" to="/" />
      <MailBox />
    </div>
  );
};

export default MailboxPage;