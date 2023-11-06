import { useState, useEffect } from "react";
import { useRecoilValue } from 'recoil';
import { UserSelector } from '../../recoil/user/userSelector';
import { locationInfo } from '../../api/locationApi';
import UserInfo from "./UserInfo";
import MainArea from "./MainArea";
import MainBackgroundImage from "../../assets/images/background-image.png"
import NumberOfUsers from "./NumberOfUsers";
import { getLocationInfo } from "../common/GetLocationInfo";
import { useSetRecoilState } from "recoil";
import { LatitudeAtom, LongitudeAtom } from "../../recoil/location/locationAtom";


const MainBackground = () => {
  // user 정보
  const user = useRecoilValue(UserSelector);
  const memberId = user.memberId;

  // 위치 정보
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  //위도 경도 recoil 상태 업데이트
  const setLongitudeAtom = useSetRecoilState(LongitudeAtom);
  const setLatitudeAtom = useSetRecoilState(LatitudeAtom);


  // 주변 정보 
  const [selectedBackground, setSelectedBackground] = useState(''); // 날씨 배경 
  const [aroundPeople, setAroundPeople] = useState([]) // 주변 사용자 
  const [aroundPeopleCount, setAroundPeopleCount] = useState(0); // 주변 사용자 수

  useEffect(() => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);

          // 전역 위도, 경도 정보 저장
          setLatitudeAtom(position.coords.latitude);
          setLongitudeAtom(position.coords.longitude);
        },
        (e) => {
          console.log(e.message)
        });
    } else {
      console.log('위치 정보를 지원하지 않는 브라우저입니다.')
    }
  }, []);

  // 위치 기반 정보(날씨, 주변 유저, 주변 유저 수)
  useEffect(() => {
    if (memberId && latitude !== null && longitude !== null) {
      locationInfo(memberId, latitude, longitude)
        .then((data) => {
          if (data) {
            setSelectedBackground(data.data.statusWeather);
            setAroundPeopleCount(data.data.aroundPeopleCount);
            setAroundPeople(data.data.aroundPeople);
            updateUnreadCounts(data.data.unreadChatCount, data.data.unreadMessageCount);
          }
          console.log('위치 API 응답:', data.data)
        });
    }
  }, [memberId, latitude, longitude]);


  // 날씨 배경 
  const backgroundClass = `w-full h-full absolute ${selectedBackground === 'POSITIVE' ? "bg-gradient-1"
    : selectedBackground === 'NEUTRAL' ? "bg-gradient-2"
      : "bg-gradient-3"
    }`;

  return (
    <div className="h-screen overflow-hidden">
      <div className={backgroundClass} style={{ zIndex: 3, backgroundSize: "cover" }}>
        <UserInfo selectedBackground={selectedBackground} />
        <MainArea 
          aroundPeople={aroundPeople}
          unreadChatCount={unreadChatCount} 
          unreadMessageCount={unreadMessageCount}
          />
        <NumberOfUsers aroundPeopleCount={aroundPeopleCount} />
      </div>
      <div className="bottomBG h-screen flex justify-center  relative bg-[#abcdf0]" style={{ zIndex: -1 }}>
        <img src={MainBackgroundImage}
          className="h-full absolute top-40 object-cover opacity-60 " />
      </div>
    </div>
  );
};

export default MainBackground;