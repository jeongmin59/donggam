import React, { useState } from 'react';
import CharacterItem from './CharacterItem';

const CharacterModal = ({ onClose, changeCharacter, nowCharacterId }) => {
  const charArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

  const [char, setChar] = useState(nowCharacterId)

  const updateImage = () => {
    setChar()
  }


  return (
    <div className="fixed inset-0 bg-black/50 z-10 ">
      <div className="absolute bottom-0 w-full max-w-screen-md bg-white rounded-t-lg px-4 pb-10">
        <button 
          className="absolute top-0 right-0 mt-6 mr-6 text-blue-300"
          onClick={() => {
            onClose();
            updateImage(nowCharacterId);
          }}>확인
        </button>
        <div className="flex flex-col items-center">
          <h2 className="mt-12 mb-2">캐릭터 선택</h2>
          <h5>메인 화면에 보일 내 캐릭터를 선택해주세요!</h5>
        </div>
        <div className="my-6 grid grid-cols-4">
          {charArray.map((characterId) => (
            <CharacterItem
              key={characterId}
              characterId={characterId}
              changeCharacter={changeCharacter}
              isTransparent={characterId !== nowCharacterId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;