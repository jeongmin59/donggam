import React, { useState } from 'react';

const CharacterItem = ({ characterId, changeCharacter }) => {

  // 캐릭터 이미지 주소
  const myCharacter = `/character/${characterId}.svg`

  const handleCharacterChange = () => {
    changeCharacter(characterId);
  };

  return (
    <div className="character-small" onClick={handleCharacterChange}>
      <div>
        <img src={myCharacter} alt={`${characterId}번 캐릭터`} />
      </div >
    </div >
  );
};

export default CharacterItem;