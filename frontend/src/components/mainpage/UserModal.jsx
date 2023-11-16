import Modal from "../common/Modal";
import SmallButton from "../common/SmallButton";
import { useNavigate } from 'react-router-dom';

const UserModal = ({ modalInfo, openMailModal }) => {
  const navigate = useNavigate();

  const handleChatting = () => {
    navigate('/chat', {
      state : {
        memberId: modalInfo.otherMemberId,
        memberName: modalInfo.otherNickname,
        isInvite: true,
      }
    });
  } 

  return(
    <>
      <div className="w-[100%] space-y-3">
        <h2 className="mx-2">{modalInfo.otherNickname}</h2>
        <div className="bg-gray-100 px-5 py-5 rounded-[16px]">{modalInfo.otherStatus}</div>
        <div className='flex justify-center'><img src={`/character/${modalInfo.otherCharacterId}.svg`}/></div>
      </div>
      <div className="mt-10 flex space-x-2 ">
        <SmallButton 
          title='채팅하기' 
          onClick={() => handleChatting()}
        />
        <SmallButton 
          title='쪽지쓰기' 
          onClick={() => openMailModal(modalInfo.otherStatusId)} // (예정)
        />
      </div>  
    </>
  );
}

export default UserModal;