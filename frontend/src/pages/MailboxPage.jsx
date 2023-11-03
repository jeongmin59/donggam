import React from 'react';
import Header from '../components/common/Header';
import MailBox from './../components/mailboxpage/MailBox';

const MailboxPage = () => {
  return (
    <div className='chatting h-screen bg-gradient-to-b from-[#e5f3ff] to-white'>
      <Header title="쪽지" />
      <MailBox />
    </div>
  );
};

export default MailboxPage;