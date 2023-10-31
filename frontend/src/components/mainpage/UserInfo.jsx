// import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { UserSelector } from "../../recoil/user/userSelector";
import PositiveImg from '../../assets/images/positive.svg';
import NeutralImg from '../../assets/images/neutral.svg';
import NegativeImg from '../../assets/images/negative.svg';

const UserInfo = ({selectedBackground}) => {
  // 전역 user 정보 가져오기
  const user = useRecoilValue(UserSelector);
  const nickname = user.nickname
  const statusMessage = user.statusMessage

  let backgroundImage;

  if (selectedBackground === "POSITIVE") {
    backgroundImage = PositiveImg;
  } else if (selectedBackground === "NEUTRAL") {
    backgroundImage = NeutralImg;
  } else {
    backgroundImage = NegativeImg;
  }

  const imageStyle = {
    position: "absolute",
    top: "-70px",
    right: "5%", 
    zIndex: "-1",
  };

  return (
    <div className="userInfo h-100 px-[24px] mx-auto mt-[60px] relative">
      <h2 className="username mb-[10px] pl-3">{nickname}</h2>
      <img src={backgroundImage} alt={selectedBackground} style={imageStyle}/>
      <div className="usermsg h-auto bg-white rounded-2xl flex justify-center">
        <p className="px-[40px] py-[20px] text-center ">{statusMessage}</p>
      </div>
    </div>
  );
};

export default UserInfo;