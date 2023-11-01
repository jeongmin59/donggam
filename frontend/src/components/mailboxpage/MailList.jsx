import React, { useState } from 'react';
import MailItem from './MailItem';
import mailIcon from '../../assets/images/message.png'


const MailList = (mail) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const mailData = mail.mail
  return (
    <div>
      <div>
        <img onClick={openModal} src={mailIcon} alt="Mail Icon" />
        <MailItem isOpen={isModalOpen} onClose={closeModal} mailData={mailData} />
      </div>
    </div>

  );
};

export default MailList;