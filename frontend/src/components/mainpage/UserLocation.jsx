import { useRecoilValue } from "recoil";
import { UserSelector } from "../../recoil/user/userSelector";
import Lottie from "react-lottie";
import animationData from "../../assets/animation/location-animation.json";
import UserCharacter from "./UserCharacter";


// const UserCharacter = ({ character, existingCharacters }) => {
//   // 랜덤 위치 배정
//   let positionX, positionY;
//   let isOverlapping;

//   do {
//     isOverlapping = false;
//     positionX = Math.floor(Math.random() * (70 - 20) + 20);
//     positionY = Math.floor(Math.random() * (75 - 15) + 15);

//     for (const existingCharacter of existingCharacters) {
//       const charX = existingCharacter.left;
//       const charY = existingCharacter.top;
//       const dx = Math.abs(positionX - parseInt(charX));
//       const dy = Math.abs(positionY - parseInt(charY));

//       if (dx < 200 && dy < 200) {
//         isOverlapping = true;
//         break;
//       }
//     }
//   } while (isOverlapping);

//   return (
//     <div
//       className="user-element"
//       style={{
//         position: "absolute",
//         left: positionX + "%",
//         top: positionY + "%",
//         width: "30%", // 이미지 크기에 따라 설정
//         padding: "10px",
//       }}
//     >
//       <img src={`/character/${character}.svg`} style={{ width: "100%" }} />
//     </div>
//   );
// };

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

  const animationStyle = {
    transform: "scale(2)", // 2배 크기로 확대
  };



  return (
    <div className="flex justify-center items-center overflow-hidden" style={{ width: "100%", height: "100%", zIndex: -1 }}>
      <div className="nya relative flex justify-center items-center" style={{ width: "100%", height: "100%", zIndex: 1 }}>
        <div>
          <img src={myCharacter} alt={`${characterId}번 캐릭터`} />
        </div>
        {userCharacters.map((character, index) => (
          <UserCharacter 
            key={index} 
            character={character} 
            existingCharacters={userCharacters} />
        ))}
      </div>
      <div className="flex absolute" style={{ height: "calc(100% - 280px)", zIndex: -1 }}>
        <div className="overflow-hidden">
          <Lottie options={defaultOptions} style={animationStyle} />
        </div>
      </div>
    </div>
  );
};

export default UserLocation;
