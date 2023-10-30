import ChattingBtn from '../../assets/icons/chatting-btn.svg';
import MessageBtn from '../../assets/icons/message-btn.svg';
import { useNavigate } from 'react-router-dom';


const Sidebuttons = () => {

  // 페이지 이동
  const navigate = useNavigate()
  const navigateTo = (path) => {
    navigate(path);
  };

  return(
    <>
      <div className='flex-column justify-end absolute mt-5 right-5' style={{ zIndex: 3 }}>
        <img 
          src={ChattingBtn} 
          onClick={() => navigateTo('/chatting/:userId')}
          className="mb-2"
        />
        <img 
          src={MessageBtn}
          onClick={() => navigateTo('/mailbox/:userId')}
        />
      </div>
    </>
  );
};

export default Sidebuttons