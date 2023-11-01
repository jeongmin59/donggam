import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { UserSelector } from "../../recoil/user/userSelector";
import { getOtherUserInfo } from "../../api/userApi";
import Lottie from "react-lottie";
import animationData from "../../assets/animation/location-animation.json";
import UserCharacter from "./UserCharacter";
import Modal from "../common/Modal";
import SmallButton from "../common/SmallButton";

// const UserLocation = ({ otherMemberIds, userCharacters }) => {
const UserLocation = ({ otherUserInfo }) => {
  // 유저 정보
  const user = useRecoilValue(UserSelector);
  const characterId = user.characterId;
  const myCharacter = `/character/${characterId}.svg`;

  // 상대방 정보
  const [otherNickname, setOtherNickname] = useState('');
  const [otherStatus, setOtherStatus] = useState('');
  const [otherCharacter, setOtherCharacter] = useState(0);
  
  useEffect(() => {
    // otherUserInfo 배열 내의 각 사용자 정보로부터 memberId를 추출하여 get 요청을 수행
    otherUserInfo.map((otherUser) => {
      const OtherMemberId = otherUser.memberId;
      // memberId를 사용해 get 요청 수행
      getOtherUserInfo(OtherMemberId)
        .then((data) => {
          console.log("상대방 정보:", data);
          setOtherNickname(data.data.nickname);
          setOtherStatus(data.data.status);
          setOtherCharacter(data.data.characterId);
        })
        .catch((error) => {
          console.error("상대방 정보 가져오기 실패!", error);
        });
    });
  }, [otherUserInfo]);

  // 애니메이션 
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
    },
  };
  const animationStyle = {
    transform: "scale(2)", // 2배 크기
  };

  // 모달 처리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {/* 모달 내용 */}
          <h2>{otherNickname}</h2>
          <div className="bg-gray-100">{otherStatus}</div>
          <div><img src={`/character/${otherCharacter}.svg`}/></div>
          <div>
            <span><SmallButton title='채팅하기' /></span>
            <span><SmallButton title='채팅하기' /></span>
          </div>
        </Modal>
      )}
      <div className="flex justify-center items-center overflow-hidden" style={{ width: "100%", height: "100%", zIndex: -1 }}>
        <div className="nya relative flex justify-center items-center" style={{ width: "100%", height: "100%", zIndex: 1 }}>
          <div>
            <img src={myCharacter} alt={`${characterId}번 캐릭터`} />
          </div>
          {otherUserInfo.map((otherUser, index) => (
            <UserCharacter 
              key={index} 
              otherCharacterId={otherUser.characterId} 
              existingCharacters={otherUserInfo}
              onCharacterClick={handleOpenModal}
            />
          ))}
        </div>
        <div className="flex absolute" style={{ height: "calc(100% - 280px)", zIndex: -1 }}>
          <div className="overflow-hidden">
            <Lottie options={defaultOptions} style={animationStyle} />
          </div>
        </div>
      </div>
      
    </>
  );
};

export default UserLocation;
