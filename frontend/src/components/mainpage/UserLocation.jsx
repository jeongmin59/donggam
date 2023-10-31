import { useRecoilValue } from "recoil";
import { UserSelector } from "../../recoil/user/userSelector";
import React from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/animation/location-animation.json";

const getRandomPosition = (min, max, exceptions = []) => {
  let position;
  do {
    position = Math.floor(Math.random() * (max - min) + min) + "%";
  } while (exceptions.includes(position));
  return position;
};

const UserCharacter = ({ character, existingCharacters }) => {
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
      }}
    >
      <img src={`/character/${character}.svg`} style={{ width: "60%" }} />
    </div>
  );
};

const UserLocation = ({ userCharacters }) => {
  const user = useRecoilValue(UserSelector);
  const characterId = user.characterId;
  const myCharacter = `/character/${characterId}.svg`;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
    },
  };

  return (
    <div className="flex justify-center items-center" style={{ width: "100%", height: "100%", zIndex: -1 }}>
      <div className="nya relative flex justify-center items-center" style={{ width: "100%", height: "100%", zIndex: 1 }}>
        <div>
          <img src={myCharacter} alt={`${characterId}번 캐릭터`} />
        </div>
        {userCharacters.map((character, index) => (
          <UserCharacter key={index} character={character} existingCharacters={userCharacters} />
        ))}
      </div>
      <div className="flex absolute" style={{ height: "calc(100% - 280px)", zIndex: -1 }}>
        <Lottie options={defaultOptions} />
      </div>
    </div>
  );
};

export default UserLocation;
