import { useState, useEffect } from "react";
// import { useRecoilValue, SetRecoilState } from "recoil";
import { existingCharactersSelector } from "../../recoil/existingCharacter/existingCharacterSelector";
import { useRecoilState } from "recoil";

const UserCharacter = ({ otherCharacterId, onCharacterClick }) => {
  // const existingCharacters = useRecoilValue(existingCharactersSelector);
  const [existingCharacters, setExistingCharacters] = useRecoilState(
    existingCharactersSelector,
  );
  // console.log(existingCharacters);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  // console.log(existingCharacters);

  useEffect(() => {
    const fetchData = async () => {
      let isOverlapping = true;
      let initialX, initialY;

      while (isOverlapping) {
        isOverlapping = false;
        initialX = Math.floor(Math.random() * (70 - 20) + 20);
        initialY = Math.floor(Math.random() * (75 - 15) + 15);

        if (
          initialX >= 15 &&
          initialX <= 60 &&
          initialY >= 25 &&
          initialY <= 60
        ) {
          isOverlapping = true;
          continue;
        }
        for (const existingCharacter of existingCharacters) {
          const charX = existingCharacter.left;
          const charY = existingCharacter.top;
          const dx = Math.abs(initialX - charX);
          const dy = Math.abs(initialY - charY);

          if (dx + dy < 50) {
            isOverlapping = true;
            break;
          }
        }
      }

      const newCharacter = { left: initialX, top: initialY };

      await setExistingCharacters((prevExistingCharacters) => [
        ...prevExistingCharacters,
        newCharacter,
      ]);
      setPositionX(initialX);
      setPositionY(initialY);
    };

    fetchData();
  }, []);

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
