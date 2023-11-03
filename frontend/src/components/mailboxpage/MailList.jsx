import React, { useState } from 'react';
import MailItem from './MailItem';
import mailIcon from '../../assets/images/message.png'
import { postMailRead } from '../../api/mailApi';


const MailList = (mail) => {
  const mailData = mail.mail
  const mailId = mailData.messageId
  const isRead = mailData.isRead
  const isLiked = mailData.isLiked

  console.log('!!!!!!데이타!!!!!!!!!', mailData)

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
      <img onClick={handleMailClick} src={mailIcon} alt="Mail Icon" />
      <p>읽음 여부 : {isRead ? "읽음" : "안읽음"}</p>
      <p> 좋아요 여부: {isLiked ? "좋아요" : "싫어요"}</p>
      <MailItem isOpen={isModalOpen} onClose={closeModal} mailData={mailData} />
    </div>
  );
};

export default MailList;