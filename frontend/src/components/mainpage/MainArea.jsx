import ChattingBtn from '../../assets/icons/chatting-btn.svg';
import MessageBtn from '../../assets/icons/message-btn.svg';

const MainArea = () => {
  return(
  <>
    <div className='flex justify-end'>
      <div className='mt-10'>
        <img src={ChattingBtn} className="-mb-10"/>
        <img src={MessageBtn}/>
      </div>
    </div>  
  </>
  )
}

export default MainArea;