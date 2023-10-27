// import { useState, useEffect } from "react";

import { useRecoilValue } from "recoil";
import { UserSelector } from "../../recoil/user/userSelector";

const UserInfo = () => {
  // 전역 user 정보 가져오기
  const user = useRecoilValue(UserSelector);
  const nickname = user.nickname
  const statusMessage = user.statusMessage


  return (
    <div className="userInfo h-100 px-[24px] mx-auto mt-[60px]">
      <h2 className="username mb-[10px] pl-3">{nickname}</h2>
      <div className="usermsg h-auto bg-white rounded-2xl flex justify-center">
        <p className="px-[40px] py-[20px] text-center ">{statusMessage}</p>
      </div>
    </div>
  );
};

export default UserInfo;