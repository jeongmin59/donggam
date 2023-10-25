// import { useState, useEffect } from "react";

const UserInfo = () => {
  // const [latitude, setLatitude] = useState(null);
  // const [longitude, setLongitude] = useState(null);

  // // 현위치
  // useEffect(()=>{
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position)=> {
  //       setLatitude(position.coords.latitude);
  //       setLongitude(position.coords.longitude);
  //     }, (e) => {
  //       console.log(e.meesage);
  //     });
  //   } else {
  //     console.log('위치 정보를 지원하지 않는 브라우저입니다.')
  //   }
  // },[])

  return(
    <div className="w-80 h-[70px] mx-auto mt-[78px]">
      <p className="username mb-[10px]">사용자 이름</p>
      <div className="usermsg h-full bg-white rounded-2xl flex justify-center">
        <p className="px-[37px] py-[18px] text-center">상태메시지를 입력하세요상태메시지를 </p>
      </div>

      {/* <p>위도 : {latitude}</p>
      <p>경도 : {longitude}</p>         */}
      {/* <p>사용자이름</p>
      <div className="bg-white w-80">
        <p>사용자 상태메시지</p>
      </div> */}
    </div>
  );
};

export default UserInfo;