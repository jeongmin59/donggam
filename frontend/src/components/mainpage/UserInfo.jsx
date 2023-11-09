// import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router";
import { UserSelector } from "../../recoil/user/userSelector";
import PositiveImg from '../../assets/images/positive.svg';
import NeutralImg from '../../assets/images/neutral.svg';
import NegativeImg from '../../assets/images/negative.svg';
import SettingIcon from '../../assets/icons/setting-icon.svg'

const UserInfo = ({selectedBackground}) => {

  // 전역 user 정보 가져오기
  const user = useRecoilValue(UserSelector);
  const nickname = user.nickname
  const statusMessage = user.statusMessage

  // 날씨 배경 
  let backgroundImage;

  if (selectedBackground === "POSITIVE") {
    backgroundImage = PositiveImg;
  } else if (selectedBackground === "NEUTRAL") {
    backgroundImage = NeutralImg;
  } else {
    backgroundImage = NegativeImg;
  }

  // 페이지 이동
  const navigate = useNavigate()
  const navigateTo = (path) => {
    navigate(path);
  };

  const imageStyle = {
    // position: "absolute",
    // top: "-70px",
    // right: "5%", 
    zIndex: "-1",
  };

  return (
    <div className="userInfo h-100 px-[24px] mx-auto mt-[60px] relative">
      <div className="flex justify-between mb-2">
        <h2 className="username pl-3 flex mb-0">{nickname}</h2>
        <img 
          src={SettingIcon}
          onClick={() => navigateTo('/profile')}
        />
      </div>
      <img 
        src={backgroundImage} 
        alt={selectedBackground}
        className="absolute top-[-70px] right-[5%]"
        style={imageStyle}
      />
      <div className="usermsg h-[hug] bg-white rounded-2xl flex justify-center">
        <p className="px-[20px] py-[20px] text-center ">{statusMessage}</p>
      </div>
    </div>
  );
};

export default UserInfo;