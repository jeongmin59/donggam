import { useState, useEffect } from "react";

const UserInfo = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // 현위치
  useEffect(()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=> {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      }, (e) => {
        console.log(e.meesage);
      });
    } else {
      console.log('위치 정보를 지원하지 않는 브라우저입니다..')
    }
  },[])

  return(
    <div className="bg-white w-80">
      <p>위도 : {latitude}</p>
      <p>경도 : {longitude}</p>        
      <p>사용자이름</p>
      <p>사용자 상태메시지</p>
    </div>
  );
};

export default UserInfo;