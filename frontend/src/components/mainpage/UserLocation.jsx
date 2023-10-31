import { useRecoilValue } from "recoil";
import { UserSelector } from "../../recoil/user/userSelector";
import { useState, useEffect } from "react";

import Lottie from "react-lottie"
import animationData from "../../assets/animation/location-animation.json";

const UserLocation = ({userCharacters}) => {
  const user = useRecoilValue(UserSelector);
  const characterId = user.characterId
  const myCharacter =  `/character/${characterId}.svg`

  // 유저 캐릭터 정보 
  // const [userCharacters, setUserCharacters] = useState([]);
  // useEffect(() => {
  //   const characters = aroundPeople.map((person) => person.characterId);
  //   setUserCharacters(characters);
  // }, [aroundPeople]);


  // console.log('되나용',userCharacters);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      // 너비 설정
      preserveAspectRatio: "xMidYMid meet",
    },
  }

  // 랜덤 위치 계산, 예외처리
  const getRandomPosition = (min, max, exceptions = []) => {
    let position;
    do {
      position = Math.floor(Math.random() * (max - min) + min) + '%'; 
    } while (exceptions.includes(position));
    return position;
  };

  // useEffect(() => {
  //   const userElements = document.querySelectorAll('.user-element');

  //   //div 내부 랜덤 위치에 각 span 요소 배치
  //   userElements.forEach(userElement => {
  //     userElement.style.position = 'absolute';
  //     userElement.style.left = getRandomPosition(90)
  //     userElement.style.top = getRandomPosition(100)
  //   });
  // },[]);
  

  return(
    <>
      <div className='flex justify-center items-center' style={{ width: '100%', height: '100%' , zIndex: -1 }}>
        <div className='nya relative flex justify-center items-center' style={{ width: '100%', height: '100%' , zIndex: 1 }}>
          <div><img src={myCharacter} alt={`${characterId}번 캐릭터`} /></div>
          {userCharacters.map((characters, index) => (
            <div key={index} className="user-element" style={{
              position: 'absolute',
              left: getRandomPosition(20,70), 
              top: getRandomPosition(15,75), 
            }}>
              <img src={`/character/${characters}.svg`} style={{ width: '70%' }}/>
              {/* <span>{`${characters}번 유저`}</span> */}
            </div>
          ))}
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