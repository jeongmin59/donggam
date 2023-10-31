import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { UserSelector } from "../../recoil/user/userSelector";
import { getOtherUserInfo } from "../../api/userApi";
import Lottie from "react-lottie";
import animationData from "../../assets/animation/location-animation.json";
import UserCharacter from "./UserCharacter";
import Modal from "../common/Modal";

// const UserLocation = ({ otherMemberIds, userCharacters }) => {
const UserLocation = ({ otherUserInfo }) => {
  // 유저 정보
  const user = useRecoilValue(UserSelector);
  const characterId = user.characterId;
  const myCharacter = `/character/${characterId}.svg`;

  // 상대방 정보
  useEffect(() => {
    // otherUserInfo 배열 내의 각 사용자 정보로부터 memberId를 추출하여 get 요청을 수행
    otherUserInfo.map((otherUser) => {
      const OtherMemberId = otherUser.memberId;
      // memberId를 사용해 get 요청 수행
      getOtherUserInfo(OtherMemberId)
        .then((data) => {
          console.log("상대방 정보:", data);
          // 여기서 상대방 정보를 처리하거나 상태에 저장할 수 있습니다.
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
          <div>유저 이름</div>
          <div>유저 상메</div>
          <div>유저 캐릭터</div>
          <div>
            <span>버튼1</span>
            <span>버튼2</span>
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
