const UserCharacter = ({ character, existingCharacters }) => {
  // 랜덤 위치 배정
  let positionX, positionY;
  let isOverlapping;

  do {
    isOverlapping = false;
    positionX = Math.floor(Math.random() * (70 - 20) + 20);
    positionY = Math.floor(Math.random() * (75 - 15) + 15);

    for (const existingCharacter of existingCharacters) {
      const charX = existingCharacter.left;
      const charY = existingCharacter.top;
      const dx = Math.abs(positionX - parseInt(charX));
      const dy = Math.abs(positionY - parseInt(charY));

      if (dx < 200 && dy < 200) {
        isOverlapping = true;
        break;
      }
    }
  } while (isOverlapping);


  return (
    <div
      className="user-element"
      style={{
        position: "absolute",
        left: positionX + "%",
        top: positionY + "%",
        width: "30%", // 이미지 크기에 따라 설정 == > 반응형 하니까 너무 커짐 
        padding: "10px",
      }}
    >
      <img src={`/character/${character}.svg`} style={{ width: "100%" }} />
    </div>
  );
};

export default UserCharacter;