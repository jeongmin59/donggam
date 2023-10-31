import React, { useState } from 'react';
import CharacterItem from './CharacterItem';

const CharacterModal = ({ onClose, changeCharacter, nowCharacterId }) => {
  const charArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  const [king, setKing] = useState(nowCharacterId)

  const updateImage = () => {
    setKing()
  }


  return (
    <div className="fixed inset-0 bg-black/50 z-10">
      <div className="absolute bottom-0 left-0 w-full max-w-screen-md h-[420px] bg-white rounded-t-lg px-4 pb-10">
        <h1>캐릭터를 선택해주세요</h1>
        <div className='justify-center items-start gap-2.5 inline-flex'>
          {charArray.map((characterId) => (
            <CharacterItem
              key={characterId} characterId={characterId} changeCharacter={changeCharacter} />
          ))}
        </div>
        <div>
          현재 선택된 캐릭터 : {nowCharacterId}
        </div>
        {/* <button onClick={onClose}>모달 닫아</button> */}
        <button onClick={() => {
          onClose();
          updateImage(nowCharacterId);
        }}>모달 닫아</button>
      </div>
    </div>
  );
};

export default CharacterModal;