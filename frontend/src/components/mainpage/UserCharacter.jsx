import { useState, useEffect } from "react";

const UserCharacter = ({
  otherCharacterId,
  existingCharacters,
  onCharacterClick,
  setExistingCharacters,
}) => {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
    };
    // 랜덤 위치 배정
    let initialX, initialY;
    let isOverlapping;
    do {
      isOverlapping = false;
      initialX = Math.floor(Math.random() * (70 - 20) + 20);
      initialY = Math.floor(Math.random() * (75 - 15) + 15);
      if(initialX >= 15 && initialX <= 60 && initialY >= 25 && initialY <= 60){
        isOverlapping = true;
        continue;
      }

      for (const existingCharacter of existingCharacters) {
        const charX = existingCharacter.left;
        const charY = existingCharacter.top;
        const dx = Math.abs(initialX - charX);
        const dy = Math.abs(initialY - charY);
        if (
          dx + dy < 30
          ) {
            console.log(dx+dy);
            isOverlapping = true;
          break;
        }
      }
    } while (isOverlapping);

    setPositionX(initialX);
    setPositionY(initialY);
    const newCharacter = { left: initialX, top: initialY };
    setExistingCharacters((prev) => [...prev, newCharacter]);
  }, [setExistingCharacters]);

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
          width: "100px", // 이미지 크기에 따라 설정 == > 반응형 하니까 너무 커짐
          padding: "10px",
        }}
        onClick={handleCharacterClick}
      >
        <img
          src={`/character/${otherCharacterId}.svg`}
          style={{ width: "80%" }}
        />
      </div>
    </>
  );
};

export default UserCharacter;
