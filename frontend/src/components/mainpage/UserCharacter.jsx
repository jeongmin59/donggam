import { useState, useEffect } from "react";

const UserCharacter = ({
  otherCharacterId,
  onCharacterClick,
  positionX,
  positionY,
}) => {
  // 모달 클릭 이벤트 상위 컴포넌트로 전달
  const handleCharacterClick = () => {
    onCharacterClick();
  };

  return (
    <>
      <div
        className="user-element"
        style={{
          position: "absolute",
          left: positionX + "%",
          top: positionY + "%",
          width: "80px", // 이미지 크기에 따라 설정 == > 반응형 하니까 너무 커짐
          padding: "10px",
        }}
        onClick={handleCharacterClick}
      >
        <img
          src={`/character/${otherCharacterId}.svg`}
          // style={{ width: "100%" }}
        />
      </div>
    </>
  );
};

export default UserCharacter;
