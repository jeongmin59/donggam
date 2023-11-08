import Modal from "../common/Modal";
import SmallButton from "../common/SmallButton";
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../api/axiosConfig";

const UserModal = ({ modalInfo, openMailModal }) => {
  const navigate = useNavigate();

  const handleChatting = async () => {
    const res = await axiosInstance.post(`/chat/invite`, {
      memberId: modalInfo.otherMemberId,
    });
    if (res.status === 200) {
      console.log(res.data.data); // roomId 확인
      const roomId = res.data.data.roomId;
      const isActive = res.data.data.isActive;
      const roomName = modalInfo.otherNickname;
      console.log(roomName);
      navigate(`/chatting/${roomId}`, {state : {isActive , roomName}});
    } else {
      console.log('채팅 신청 실패');
      if (res.response.status === 401) {
        console.log('401 에러 발생');
        const confirm = window.confirm('다시 로그인 해주세요');
        if (confirm) {
          navigate('/login');
        }
      }
    }
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