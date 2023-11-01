import React, { useEffect, useState } from 'react';
import { getMailDetail } from '../../api/mailApi';


const MailItem = ({ isOpen, onClose, mailData }) => {
  // 모달 밖 클릭 시 모달 닫힘 
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;
  // 
  const mailId = mailData.messageId
  const content = mailData.content

  // 쪽지 data
  const [mailDetail, setMailDetail] = useState(content);

  useEffect(() => {
    getMailDetail(mailId)

      .then((res) => {
        setMailDetail(res.content)
        // console.log('정신차리라', res)
      })
      .catch((err) => {
        console.log('쪽지 detail 가져오기 실패ㄱ-', err)
      })
  }, [])


  return (
    <>
      <div
        className={`${isOpen ? 'show' : ''} 
        top-0 left-0 w-full h-full fixed flex justify-center align-center`}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          padding: '0 28px 0',
          zIndex: 3,
        }}
        onClick={handleBackgroundClick}
      >
        {/* 모달 컨텐츠 */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            width: '100%',
            height: '55%',
            margin: 'auto'
          }}>
          <h1>{mailDetail} </h1>
        </div>
      </div>
    </>
  );
};


export default MailItem;