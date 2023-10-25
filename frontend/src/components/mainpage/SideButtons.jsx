import ChattingBtn from '../../assets/icons/chatting-btn.svg';
import MessageBtn from '../../assets/icons/message-btn.svg';


const SideButtons = () => {
  return(
    <div className='flex-column'>
      <img src={ChattingBtn} className="-mb-10"/>
      <img src={MessageBtn}/>
    </div>
  );
};

export default SideButtons;