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
    <div className="h-[70px] px-[24px] mx-auto mt-[78px]">
      <h1 className="username mb-[10px]">사용자 이름</h1>
      <div className="usermsg h-auto bg-white rounded-2xl flex justify-center">
        <p className="px-[40px] py-[20px] text-center ">내 감정! 내 느낌! 달님.. 듣고 있나요?</p>
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