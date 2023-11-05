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
import likedImg from '../../assets/like/liked.png'


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
      <div>
        <img 
          onClick={handleMailClick} 
          src={randomMailIcon}
          alt="Mail Icon" 
          className='w-24 h-24' />
      </div>
      {/* <p>읽음 여부 : {isRead ? "읽음" : "안읽음"}</p> */}
      {isLiked ? <img src={likedImg} alt="Liked Icon" /> : <p></p>}
      <MailItem isOpen={isModalOpen} onClose={closeModal} mailData={mailData} />
    </div>
  );
};

export default MailList;