import ChattingBtn from '../../assets/icons/chatting-btn.svg';
import MessageBtn from '../../assets/icons/message-btn.svg';
import { useNavigate } from 'react-router-dom';
import LocationAnimation from './LocationAnimation'

const MainArea = () => {
  const navigate = useNavigate()
  const navigateTo = (path) => {
    navigate(path);
  };

  return(
  <div className='mainArea'>
    <div className='flex justify-end absolute mt-10 right-5' style={{ zIndex: 1 }}>
      <div>
        <img 
          src={ChattingBtn} 
          className="mb-2"
        />
        <img 
          src={MessageBtn}
          onClick={() => navigateTo('/mailbox/:userId')}
        />
      </div>
    </div> 
    <div className='flex absolute mt-20' style={{ transform: 'scale(2)', zIndex: -1 }}>
      <LocationAnimation />
    </div> 
  </div>
  )
}

export default MainArea;