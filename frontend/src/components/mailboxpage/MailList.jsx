import React, { useState } from 'react';
import MailItem from './MailItem';
import { postMailRead } from '../../api/mailApi';
import pinkMail from '../../assets/mail/1_pink.svg'
import orangeMail from '../../assets/mail/2_orange.svg'
import yellowMail from '../../assets/mail/3_yellow.svg'
import greenMail from '../../assets/mail/4_green.svg'
import skyblueMail from '../../assets/mail/5_skyblue.svg'
import mintMail from '../../assets/mail/6_mint.svg'
import violetMail from '../../assets/mail/7_violet.svg'
import blueMail from '../../assets/mail/8_blue.svg'
import beigeMail from '../../assets/mail/9_beige.svg'


const MailList = (mail) => {
  const mailData = mail.mail
  const mailId = mailData.messageId
  const isRead = mailData.isRead
  const isLiked = mailData.isLiked

  const mailIcons = [
    pinkMail, orangeMail, yellowMail, greenMail,
    skyblueMail, mintMail, violetMail, blueMail, beigeMail
  ];

  const randomIndex = Math.floor(Math.random() * mailIcons.length);
  const randomMailIcon = mailIcons[randomIndex];

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
    <div className='flex flex-col justify-center items-center'>
      <img 
        onClick={handleMailClick} 
        src={randomMailIcon}
        alt="Mail Icon" 
        className='w-24 h-24' />
      {/* <p>읽음 여부 : {isRead ? "읽음" : "안읽음"}</p> */}
      {/* <p> 좋아요 여부: {isLiked ? "좋아요" : "싫어요"}</p> */}
      <MailItem isOpen={isModalOpen} onClose={closeModal} mailData={mailData} />
    </div>
  );
};

export default MailList;