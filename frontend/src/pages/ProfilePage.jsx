import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { UserSelector } from './../recoil/user/userSelector';
import { NicknameAtom } from '../recoil/user/userAtom';
import { updateNickname } from '../api/userApi';

const ProfilePage = () => {
  // 전역상태의 유저 정보 가져오기
  const [nickName, setNickname] = useRecoilState(NicknameAtom);

  const [newNickname, setNewNickname] = useState(nickName);


  const handleUserUpdateClick = () => {
    updateNickname(newNickname)

      .then((res) => {
        console.log('닉네임 변경', res)
      })
      .catch((err) => {
        console.log('닉네임 변경 안됨', err)
      })
  }

  const handleNicknameChange = (e) => {
    setNewNickname(e.target.value);
  };



  return (
    <div>
      <div>
        <div>현재 닉네임 : {nickName}</div>
        <input
          type="text"
          value={newNickname}
          onChange={handleNicknameChange}
        />
        <button onClick={handleUserUpdateClick}>확인</button>
      </div>
    </div>
  );
};

export default ProfilePage;