import React, { useEffect, useState } from 'react';
import { getMailDetail, postMailLike } from '../../api/mailApi';
import like from '../../assets/like/full_heart.png';
import dislike from '../../assets/like/empty_heart.png';
import alertIcon from '../../assets/icons/alert.png';
import ToastModal from './../common/ToastModal';
import SmallButton from '../common/SmallButton';

const MailItem = ({ isOpen, onClose, mail, updateLikedState, setLikeMailCount }) => {

  const [mailDetail, setMailDetail] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const mailId = mail.messageId;

  // 모달 영역 밖 클릭 시 모달 닫기
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleLikeClick = async () => {
    await postMailLike(mailId, !isLiked);
    if (isLiked === true) {
      setLikeMailCount(currentCount => currentCount - 1);
    } else {
      setLikeMailCount(currentCount => currentCount + 1);
    }
    setIsLiked(!isLiked);

    updateLikedState(!isLiked);
  };

  const handleReportClick = () => {
    setShowToast(true);
  };

  useEffect(() => {
    getMailDetail(mailId)
      .then((res) => {
        setMailDetail(res);
        setIsLiked(res.isLiked);
        // console.log('쪽지디테일내놧!', res);
      })
      .catch((err) => {
        // console.log('쪽지 detail 가져오기 실패:', err);
      });
  }, []);

  return (
    <>
    {isOpen && (
      <div
      className={`top-0 left-0 w-full h-full fixed flex justify-center align-center`}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: '0 28px 0',
        zIndex: 3,
      }}
      onClick={handleBackgroundClick}
    >
      <div className="bg-white rounded-2xl w-full h-[70vh] max-w-md m-auto px-5 py-8 z-30 flex flex-col items-center">
      {/* <div className="bg-white rounded-2xl w-full h-1/2 max-w-md mx-auto my-auto p-4 z-30 flex flex-col items-center" style={{ overflow: 'auto' }}> */}
        <div className="px-5 pb-3 flex justify-between items-center w-full">
          {/* 보낸 사람 이름 */}
          <h3 className="ownglyph-text text-xl">From: {mailDetail.from}</h3>
          <div>
            {/* 신고하기 버튼 */}
            <img src={alertIcon} onClick={handleReportClick} />
          </div>
        </div>
        {showToast && <ToastModal message="쪽지가 신고되었습니다." onClose={() => setShowToast(false)} />}
        
        <div className='flex flex-col justify-center items-center h-[50vh] overflow-y-auto py-3'>
          {mailDetail.imgAddress && (
            <div className='mt-4 flex justify-center items-center'>
              <img 
                src={mailDetail.imgAddress} 
                alt="Mail Image"
                className="w-[70%]" />
            </div>
          )}
          {/* <div className='mail-content mx-2 flex flex-col justify-center items-center'> */}
            <div className="mt-4 px-2 text-center">
              <div className='ownglyph-text text-xl'>{mailDetail.content}</div>
            </div>
          {/* </div> */}
        </div>
        <h4 className="ownglyph-text ml-auto py-2 pr-5 text-right text-md text-gray-500">{mailDetail.localDate}</h4>


        <div className='w-full p-3 bg-mainColor rounded-3xl justify-center items-center gap-3 inline-flex' onClick={handleLikeClick}>
          <h4>마음에 들어요</h4>
          {/* 좋아요 버튼 */}
          {isLiked ? (
            <img src={like} />
          ) : (
            <img src={dislike} />
          )}
        </div>
      </div>
    </div>
    )}  
    </>
  );
};

export default MailItem;
