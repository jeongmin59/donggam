import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { UserSelector } from "../../recoil/user/userSelector";
import { getOtherUserInfo } from "../../api/userApi";
import Lottie from "react-lottie";
import animationData from "../../assets/animation/location-animation.json";
import UserCharacter from "./UserCharacter";
import Modal from "../common/Modal";
import SmallButton from "../common/SmallButton";


const UserLocation = ({ otherUserInfo }) => {
  // 유저 정보
  const user = useRecoilValue(UserSelector);
  const characterId = user.characterId;
  const myCharacter = `/character/${characterId}.svg`;

  const [modalInfo, setModalInfo] = useState(null);
  const handleModal = (otherUser) => {
    if (modalInfo) {
      // 모달이 이미 열려있는 경우, 닫고 초기화
      setModalInfo(null);
    } else {
      // 모달 열기
      getOtherUserInfo(otherUser.memberId)
        .then((data) => {
          const modalData = {
            otherNickname: data.data.nickname,
            otherStatus: data.data.status,
            otherCharacterId: data.data.characterId
          };
          setModalInfo(modalData);
        })
        .catch((error) => {
          console.error('상대방 정보 가져오기 실패!', error);
        });
    }
  }

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

  return (
    <>
      {modalInfo && (
        <Modal isOpen={true} onClose={() => setModalInfo(null)}>
          <h2>{modalInfo.otherNickname}</h2>
          <div className="bg-gray-100">{modalInfo.otherStatus}</div>
          <div><img src={`/character/${modalInfo.otherCharacterId}.svg`}/></div>
          <div className="">
            <SmallButton title='채팅하기' />
            <SmallButton title='채팅하기' />
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
              onCharacterClick={() => handleModal(otherUser)}
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
