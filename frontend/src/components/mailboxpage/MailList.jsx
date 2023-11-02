import React, { useState } from 'react';
import MailItem from './MailItem';
import mailIcon from '../../assets/images/message.png'
import { postMailRead } from '../../api/mailApi';


const MailList = (mail) => {
  const mailData = mail.mail
  const mailId = mailData.messageId
  const isRead = mailData.isRead

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleMailClick = () => {
    if (!isRead) {
      postMailRead(mailId);
    }
    openModal();
  };


  return (
    <div>
      <div>
        <img onClick={handleMailClick} src={mailIcon} alt="Mail Icon" />
        <MailItem isOpen={isModalOpen} onClose={closeModal} mailData={mailData} />
      </div>
    </div>

  );
};

export default MailList;