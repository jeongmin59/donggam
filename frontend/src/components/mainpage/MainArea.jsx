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
    <div className='flex justify-end absolute  top- 0 right-0' style={{ zIndex: 1 }}>
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
    {/* <div className='h-full absolute top-50'> */}
      <LocationAnimation />
    {/* </div>  */}
  </div>
  )
}

export default MainArea;