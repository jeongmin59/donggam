import ChattingBtn from '../../assets/icons/chatting-btn.svg';
import MessageBtn from '../../assets/icons/message-btn.svg';
import { useNavigate } from 'react-router-dom';

const Sidebuttons = ({ unreadChatCount, unreadMessageCount }) => {
  const navigate = useNavigate();

  // 페이지 이동
  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <>
      <div className='flex-column justify-end absolute mt-5 right-5' style={{ zIndex: 3 }}>
        <div className="mb-2 relative">
          <img
            src={ChattingBtn}
            onClick={() => navigateTo('/chatroom')}
          />
          {unreadChatCount > 0 && (
            <span className="bg-red-400 text-white rounded-full w-6 h-6 flex items-center justify-center absolute top-2 left-2 transform -translate-x-1/2 -translate-y-1/2">
              {unreadChatCount}
            </span>
          )}
        </div>
        <div className="relative">
          <img
            src={MessageBtn}
            onClick={() => navigateTo('/mailbox')}
          />
          {unreadMessageCount > 0 && (
            <span className="bg-red-400 text-white rounded-full w-6 h-6 flex items-center justify-center absolute top-2 left-2 transform -translate-x-1/2 -translate-y-1/2">
              {unreadMessageCount}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebuttons;
