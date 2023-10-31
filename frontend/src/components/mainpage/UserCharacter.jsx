import { useState, useEffect } from "react";

const UserCharacter = ({ otherCharacterId, existingCharacters, onCharacterClick }) => {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);

  useEffect(() => {
    // 랜덤 위치 배정
    let initialX, initialY;
    let isOverlapping;
  
    do {
      isOverlapping = false;
      initialX = Math.floor(Math.random() * (70 - 20) + 20);
      initialY = Math.floor(Math.random() * (75 - 15) + 15);
  
      for (const existingCharacter of existingCharacters) {
        const charX = existingCharacter.left;
        const charY = existingCharacter.top;
        const dx = Math.abs(initialX - parseInt(charX));
        const dy = Math.abs(initialY - parseInt(charY));
  
        if (dx < 200 && dy < 200) {
          isOverlapping = true;
          break;
        }
      }
    } while (isOverlapping);

    setPositionX(initialX);
    setPositionY(initialY);
  },[existingCharacters]);



  // 모달 클릭 이벤트 상위 컴포넌트로 전달
  const handleCharacterClick = () => {
    onCharacterClick();
  }

  return (
    <>
      <div
        className="user-element"
        style={{
          position: "absolute",
          left: positionX + "%",
          top: positionY + "%",
          width: "30%", // 이미지 크기에 따라 설정 == > 반응형 하니까 너무 커짐 
          padding: "10px",
        }}
        onClick={handleCharacterClick}
      >
        <img src={`/character/${otherCharacterId}.svg`} style={{ width: "80%" }} />
      </div>

    </>
  );
};

export default UserCharacter;