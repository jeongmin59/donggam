import Sidebuttons from "./SideButtons";
import UserLocation from "./UserLocation";
import { useState, useEffect } from "react";

const MainArea = ({ aroundPeople, unreadChatCount, unreadMessageCount }) => {
  // 근처 유저 정보
  const [otherUserInfo, setOtherUserInfo] = useState([]);

  useEffect(() => {
    if (aroundPeople) {
      const characterInfo = aroundPeople.map((person) => {
        return {
          memberId: person.memberId,
          characterId: person.characterId,
          positionX: person.positionX,
          positionY: person.positionY,
        };
      });
      setOtherUserInfo(characterInfo);
    }
  }, [aroundPeople]);

  return (
    <>
      <div
        className="mainArea flex-column justify-center "
        style={{ height: "calc(100% - 280px)" }}
      >
        <Sidebuttons
          unreadChatCount={unreadChatCount}
          unreadMessageCount={unreadMessageCount}
        />
        <UserLocation otherUserInfo={otherUserInfo} />
      </div>
    </>
  );
};
export default MainArea;
