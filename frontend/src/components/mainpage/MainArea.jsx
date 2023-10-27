import ChattingBtn from '../../assets/icons/chatting-btn.svg';
import MessageBtn from '../../assets/icons/message-btn.svg';
import LocationAnimation from './LocationAnimation'
import NumberOfUsers from './NumberOfUsers';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useRecoilValue } from 'recoil';
import { UserSelector } from '../../recoil/user/userSelector';
import { locationInfo } from '../../api/locationApi';
import UserLocation from './UserLocation';

const MainArea = () => {
  // 페이지 이동
  const navigate = useNavigate()
  const navigateTo = (path) => {
    navigate(path);
  };

  // user 정보
  const user = useRecoilValue(UserSelector);
  const memberId = user.memberId;

  // 위치 정보
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [aroundPeopleCount, setAroundPeopleCount] = useState(0);

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
            setAroundPeopleCount(data.data.aroundPeopleCount);
          }
          console.log('API 응답:', data)
          // console.log(memberId, latitude, longitude)
        });
    }
  }, [memberId, latitude, longitude]);


  return(
    <>
      <div className='mainArea flex-column justify-center ' style={{ height: 'calc(100% - 280px)' }}>
        <div className='flex justify-end absolute mt-10 right-5' style={{ zIndex: 1 }}>
          <div>
            <img 
              src={ChattingBtn} 
              onClick={() => navigateTo('/chatting/:userId')}
              className="mb-2"
            />
            <img 
              src={MessageBtn}
              onClick={() => navigateTo('/mailbox/:userId')}
            />
          </div>
        </div>
        <LocationAnimation />
        <UserLocation />
      </div>
      <NumberOfUsers aroundPeopleCount={aroundPeopleCount}/>
    </>
  )
}

export default MainArea;