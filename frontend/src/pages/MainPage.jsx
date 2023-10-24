import React, { useEffect } from "react";
import { useState } from "react";

const MainPage = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=> {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      }, (e) => {
        console.log(e.meesage);
      });
    } else {
      console.log('위치 정보를 지원하지 않는 브라우저입니다.')
    }
  },[])

  return (
    // <div className=" bg-sky-500">메인페이지</div>
    <div className="w-full h-screen relative overflow-hidden bg-[#abcdf0]">
      <div>
        메인페이지
        <p>위도 : {latitude}</p>
        <p>경도 : {longitude}</p>        
      </div>
      <img src="/background-image.png"
        className="w-full h-full absolute top-40 object-cover opacity-60 " />
    </div>
  );
};

export default MainPage;
