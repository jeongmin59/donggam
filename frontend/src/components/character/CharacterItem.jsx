import React from "react";

const CharacterItem = ({ characterId, changeCharacter, isTransparent }) => {
  // 캐릭터 이미지 주소
  const myCharacter = `/character/${characterId}.svg`

  const handleCharacterChange = () => {
    changeCharacter(characterId);
  };

  // 투명도 설정
  const transparentStyle = {
    opacity: isTransparent ? 0.3 : 1, 
    // isTransparent가 true이면 30% 투명도, 그렇지 않으면 100%
  };

  return (
    <div className="flex justify-center">
      <div className="character-small" onClick={handleCharacterChange}>
        <img 
          src={myCharacter} 
          alt={`${characterId}번 캐릭터`} 
          className="mx-auto cursor-pointer"
          style={transparentStyle} // 투명도 적용
        />
      </div>
    </div>
  );
};

export default CharacterItem;