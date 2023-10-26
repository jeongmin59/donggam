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
  <div className='mainArea relative '>
    <div className='flex justify-end absolute right-0' style={{ zIndex: 1 }}>
      <div>
        <img 
          src={ChattingBtn} 
          className="-mb-10"
        />
        <img 
          src={MessageBtn}
          onClick={() => navigateTo('/mailbox/:userId')}
        />
      </div>
    </div>  
    <LocationAnimation />
  </div>
  )
}

export default MainArea;