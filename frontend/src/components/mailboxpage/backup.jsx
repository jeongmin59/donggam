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
        className={`${
          isOpen ? 'block' : 'hidden'
        } fixed top-0 left-0 w-full h-full bg-opacity-20 bg-black flex items-center justify-center`}
        onClick={handleBackgroundClick}
      >
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            width: '100%',
            height: '55%',
            margin: 'auto',
          }}
        >
          <div>
            <p className="text-center text-sm text-gray-500 mt-2">{mailDetail.localDate}</p>
          </div>
          <div className='w-2/3 h-1/2'>
            {/* 쪽지 사진 */}
            <img src={mailDetail.imgAddress} />
          </div>
          <div>
            {/* 쪽지 내용 */}
            <h3 className="text-center mt-4">{mailDetail.content}</h3>
          </div>
          <div>
            {/* 보낸 사람 이름 */}
            <h5 className="text-center mt-4">From: {mailDetail.from}</h5>
          </div>
          <div>
            {/* 신고하기 버튼 */}
            <img src={alertIcon} onClick={handleReportClick} />
          </div>
          {showToast && <ToastModal message="쪽지가 신고되었습니다." onClose={setShowToast} />}

          <div>
            {/* 좋아요 버튼 */}
            {isLiked ? (
              <img src={like} onClick={handleLikeClick} />
            ) : (
              <img src={dislike} onClick={handleLikeClick} />
            )}
          </div>
        </div>
      </div >
    </>
  );
};

export default MailItem;
