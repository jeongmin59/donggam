import { useRecoilValue } from "recoil";
import { UserSelector } from "../../recoil/user/userSelector";

const UserLocation = () => {
  const user = useRecoilValue(UserSelector);
  const characterId = user.characterId
  const myCharacter =  `/character/${characterId}.svg`
  // const myCharacter =  `../../assets/character/${characterId}.png`

  return(
    <>
      <div className="flex justify-center items-center" style={{ height: "100%" }}>
        <img src={myCharacter} alt={`${characterId}번 캐릭터`} />
      </div>
    </>
  );
};

export default UserLocation;