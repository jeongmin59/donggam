import React, { useEffect, useState } from 'react';
import { getMailDetail, postMailLike } from '../../api/mailApi';
import like from '../../assets/like/full_heart.png';
import dislike from '../../assets/like/empty_heart.png';
import alertIcon from '../../assets/icons/alert.png';
import ToastModal from './../common/ToastModal';

const MailItem = ({ isOpen, onClose, mailData, updateLikedState }) => {
  // 모달 영역 밖 클릭 시 모달 닫기
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const mailId = mailData.messageId;

  const [mailDetail, setMailDetail] = useState({});
  const [isLiked, setIsLiked] = useState();

  useEffect(() => {
    getMailDetail(mailId)
      .then((res) => {
        setMailDetail(res);
        setIsLiked(res.isLiked);
        // console.log('쪽지디테일내놧!', res);
      })
      .catch((err) => {
        console.log('쪽지 detail 가져오기 실패:', err);
      });
  }, []);

  const handleLikeClick = () => {
    postMailLike(mailId, !isLiked);
    setIsLiked(!isLiked);

    updateLikedState(!isLiked);
  };

  const [showToast, setShowToast] = useState(false);

  const handleReportClick = () => {
    setShowToast(true);
  };

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
        <div className="bg-white rounded-2xl w-full h-1/2 max-w-md mx-auto my-auto p-4 z-30 flex flex-col items-center" style={{ overflow: 'auto' }}>
          <div className="px-5 flex justify-between items-center w-full">
            {/* 보낸 사람 이름 */}
            <h3 className="ownglyph-text text-lg">From: {mailDetail.from}</h3>
            <div>
              {/* 신고하기 버튼 */}
              <img src={alertIcon} onClick={handleReportClick} />
            </div>
          </div>
          {showToast && <ToastModal message="쪽지가 신고되었습니다." onClose={() => setShowToast(false)} />}
          
          {mailDetail.imgAddress && (
            <div className='mt-2'>
              <img 
                src={mailDetail.imgAddress} 
                alt="Mail Image"
                className="w-full h-full" />
            </div>
          )}
          <div 
            className='mail-content w-5/6 h-full flex flex-col justify-center items-center' 
            >
              
            <div className="mt-4 text-center">
              <div className='ownglyph-text text-xl'>{mailDetail.content}</div>
            </div>
          </div>
          
          <h4 className="ownglyph-text ml-auto mb-3 text-right text-md text-gray-500">{mailDetail.localDate}</h4>

          <div className='w-full h-8 px-3 py-2 bg-blue-300 rounded-3xl justify-center items-center gap-3 inline-flex' onClick={handleLikeClick}>
            <h5 className='text-white'>마음에 들어요</h5>
            {/* 좋아요 버튼 */}
            {isLiked ? (
              <img src={like} />
            ) : (
              <img src={dislike} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MailItem;
