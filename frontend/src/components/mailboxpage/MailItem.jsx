import React, { useEffect, useState } from 'react';
import { getMailDetail, postMailLike } from '../../api/mailApi';
import like from '../../assets/like/full_heart.png'
import dislike from '../../assets/like/empty_heart.png'
import alertIcon from '../../assets/icons/alert.png'
import ToastModal from './../common/ToastModal';


const MailItem = ({ isOpen, onClose, mailData }) => {
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
        console.log('쪽지디테일내놧!', res)
      })
      .catch((err) => {
        console.log('쪽지 detail 가져오기 실패:', err);
      });
  }, []);

  const handleLikeClick = () => {
    postMailLike(mailId, !isLiked)
    setIsLiked(!isLiked);
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
            <h4 className="text-center text-sm text-gray-500">{mailDetail.localDate}</h4>
            <div>
              {/* 신고하기 버튼 */}
              <img src={alertIcon} onClick={handleReportClick} />
            </div>
          </div>
          {showToast && <ToastModal message="쪽지가 신고되었습니다." onClose={() => setShowToast(false)} />}
          
          <div className='w-2/3 h-full flex flex-col justify-center items-center' style={{ overflow: 'auto' }}>
            {/* 쪽지 사진 */}
            <img src={mailDetail.imgAddress} style={{ maxWidth: '100%', maxHeight: '100%' }} />
            <div className="mt-2 text-center">
              {/* 쪽지 내용 */}
              <h3>{mailDetail.content}</h3>
            </div>
          </div>
          
          <div className='mb-3 ml-auto'>
            {/* 보낸 사람 이름 */}
            <h5 className="text-center">From: {mailDetail.from}</h5>
          </div>
          
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
      </div >
    </>
  );
};

export default MailItem;
