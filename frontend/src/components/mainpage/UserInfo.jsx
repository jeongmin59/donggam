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


  return (
    <div className="userInfo h-100 px-[24px] mx-auto mt-[60px]">
      <h2 className="username mb-[10px] pl-3">{nickname}</h2>
      {/* <img src={PositiveImg}/> */}
      <div className="usermsg h-auto bg-white rounded-2xl flex justify-center">
        <p className="px-[40px] py-[20px] text-center ">{statusMessage}</p>
      </div>
    </div>
  );
};

export default UserInfo;