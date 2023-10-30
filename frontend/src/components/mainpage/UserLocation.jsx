import { useRecoilValue } from "recoil";
import { UserSelector } from "../../recoil/user/userSelector";
import { useEffect } from "react";

import Lottie from "react-lottie"
import animationData from "../../assets/animation/location-animation.json";

const UserLocation = () => {
  const user = useRecoilValue(UserSelector);
  const characterId = user.characterId
  const myCharacter =  `/character/${characterId}.svg`
  // const myCharacter =  `../../assets/character/${characterId}.png`

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      // 너비 설정
      preserveAspectRatio: "xMidYMid meet",
    },
  }

  // 랜덤 위치 계산
  const getRandomPosition = (max) => Math.floor(Math.random() * max) + '%';

  useEffect(() => {
    const userElements = document.querySelectorAll('.user-element');
    // const containerWidth = document.querySelector('.nya').offsetWidth;

    // div 내부 랜덤 위치에 각 span 요소 배치
    userElements.forEach(userElement => {
      userElement.style.position = 'absolute';
      userElement.style.left = getRandomPosition(90)
      userElement.style.top = getRandomPosition(100)
    });
  },[]);
  

  return(
    <>
      <div className='flex justify-center items-center' style={{ width: '100%', height: '100%' , zIndex: -1 }}>
        <div className='nya relative flex justify-center items-center' style={{ width: '90%', height: '65%' , zIndex: 1 }}>
          {/* <p>오늘 날씨 {aroundWeather}</p> */}
          <div><img src={myCharacter} alt={`${characterId}번 캐릭터`} /></div>
          <div className="user-element"><span>1번 유저</span></div>
          <div className="user-element"><span>2번 유저</span></div>
          <div className="user-element"><span>3번 유저</span></div>
          {/* <span className="user-element">1번 유저</span>
          <span className="user-element">2번 유저</span>
          <span className="user-element">3번 유저</span> */}
        </div>
        <div className='flex absolute' style={{ height: 'calc(100% - 280px)' , zIndex: -1 }}>
          <Lottie
            options={defaultOptions} 
          />
        </div>
      </div>
    </>
  );
};

export default UserLocation;