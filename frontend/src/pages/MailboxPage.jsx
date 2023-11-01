import React from 'react';
import Header from '../components/common/Header';
import MailBox from './../components/mailboxpage/MailBox';

const MailboxPage = () => {
  return (
    <div>
      <Header title="쪽지함페이지" />
      <MailBox />
    </div>
  );
};

export default MailboxPage;