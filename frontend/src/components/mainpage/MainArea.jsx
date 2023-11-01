import Sidebuttons from './SideButtons';
import UserLocation from './UserLocation';
import { useState, useEffect } from 'react';


const MainArea = ({aroundPeople}) => {

  // 근처 유저 정보
  const [otherUserInfo, setOtherUserInfo] = useState([]);
  
  useEffect(() => {
    if (aroundPeople) {
      const characterInfo = aroundPeople.map((person) => {
        return {
          memberId: person.memberId,
          characterId: person.characterId,
        };
      });
      setOtherUserInfo(characterInfo);
    }
  }, [aroundPeople]);


  return(
    <>
      <div className='mainArea flex-column justify-center ' style={{ height: 'calc(100% - 280px)' }}>
        <Sidebuttons />
        <UserLocation otherUserInfo={otherUserInfo}/>
      </div>  
    </>
  )
}
export default MainArea;