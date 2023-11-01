import React from 'react';
import Header from '../components/common/Header';
import MailBox from './../components/mailboxpage/MailBox';

const MailboxPage = () => {
  return (
    <div>
      <Header title="쪽지" />
      <MailBox />
    </div>
  );
};

export default MailboxPage;