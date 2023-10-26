import ChattingBtn from '../../assets/icons/chatting-btn.svg';
import MessageBtn from '../../assets/icons/message-btn.svg';
// import LocationAnimation from './LocationAnimation';

const MainArea = () => {
  return(
  <div className='mainArea relative '>
    <div className='flex justify-end ' style={{ zIndex: -1 }}>
      <div>
        <img src={ChattingBtn} className="-mb-10"/>
        <img src={MessageBtn}/>
      </div>
    </div>  
    {/* <p className="absolute top-10 px-[24px]" style={{ zIndex: 1 }}>여기서 더 생기면 머가 늘어나지?</p> */}
    {/* <LocationAnimation />  */}
  </div>
  )
}

export default MainArea;