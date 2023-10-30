import { useState, useEffect } from "react";
import { useRecoilValue } from 'recoil';
import { UserSelector } from '../../recoil/user/userSelector';
import { locationInfo } from '../../api/locationApi';
import UserInfo from "./UserInfo";
import MainArea from "./MainArea";
import MainBackgroundImage from "../../assets/images/background-image.png"
import NumberOfUsers from "./NumberOfUsers";


const MainBackground = () => {
  // user 정보
  const user = useRecoilValue(UserSelector);
  const memberId = user.memberId;
  
  // 위치 정보
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [selectedBackground, setSelectedBackground] = useState(1); // 날씨 배경 
  // const [aroundPeople, setAroundPeople] = useState([])
  const [aroundPeopleCount, setAroundPeopleCount] = useState(0); // 주변 사용자 수

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      }, 
      (e) => {
        console.log(e.message)
      });
    } else {
      console.log('위치 정보를 지원하지 않는 브라우저입니다.')
    }
  },[]);

  useEffect(() => {
    if (memberId && latitude !== null && longitude !== null){
      locationInfo(memberId, latitude, longitude)
        .then((data) => {
          if (data) {
            // setAroundPeople(data.data.aroundPeople);
            setAroundPeopleCount(data.data.aroundPeopleCount);
          }
          console.log('위치 API 응답:', data.data)

          data.data.aroundPeople.map(person => {
            console.log(person)
          });
        });
    }
  }, [memberId, latitude, longitude]);


  // BG 
  const changeBackground = () => {
    setSelectedBackground((prevBackground) => (prevBackground % 3) +1);
  };

  const backgroundClass = `w-full h-screen absolute ${
    selectedBackground === 1 ? "bg-positive"
    : selectedBackground ===2 ? "bg-neutral"
    : "bg-negative"
  }`;
  // const backgroundClass = `w-full h-full absolute ${
  //   selectedBackground === 1 ? "bg-gradient-1"
  //   : selectedBackground ===2 ? "bg-gradient-2"
  //   : "bg-gradient-3"
  // }`;



  return (
    <div className="h-screen overflow-hidden">
      <div className={backgroundClass} style={{zIndex:3, backgroundSize: "cover" }}>
        <button className="bg-red-200" onClick={changeBackground}>배경변경</button>
        <UserInfo /> 
        <MainArea />
        <NumberOfUsers aroundPeopleCount={aroundPeopleCount}/>
      </div>
      <div className="bottomBG h-screen relative bg-[#abcdf0]" style={{ zIndex: -1 }}>
        <img src={MainBackgroundImage}
          className="h-full absolute top-40 object-cover opacity-60 " />
      </div>
    </div>
  );
};

export default MainBackground;