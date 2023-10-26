// import { useState, useEffect } from "react";

import { useRecoilValue } from "recoil";
import { UserSelector } from "../../recoil/user/userSelector";

const UserInfo = () => {
  // 전역 user 정보 가져오기
  const user = useRecoilValue(UserSelector);
  const nickname = user.nickname
  const statusMessage = user.statusMessage

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

  return (
    <div className="userInfo h-100 px-[24px] mx-auto mt-[60px]">
      <h1 className="username mb-[10px]">유저이름 :{nickname}</h1>
      <div className="usermsg h-auto bg-white rounded-2xl flex justify-center">
        <p className="px-[40px] py-[20px] text-center ">{statusMessage}</p>
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