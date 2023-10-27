import React from 'react';
import { useRecoilValue } from 'recoil';
import { UserSelector } from './../recoil/user/userSelector';

const ProfilePage = () => {
  // 전역상태의 유저 정보 가져오기
  const user = useRecoilValue(UserSelector);

  // 정보수정 후 전역상태 유저 정보 수정하기


  const handleUserUpdateClick = () => {
    const updatedUser = {
      nickname: newNickname,
      status: newStatus,
      characterId: newCharacterId,
    };
    updateUser(updatedUser)
      .then((res) => {
        // 업데이트가 성공하면 컴포넌트 상태를 업데이트합니다.
        setNewNickname(newNickname);
        setNewStatus(newStatus);
        setNewCharacterId(newCharacterId);

        // 업데이트가 성공하면 Recoil 상태를 업데이트합니다.
        setNickname(newNickname);
        setStatus(newStatus);
        setCharacter(newCharacterId);
        console.log('유저 정보 업데이트 성공?', res);
      })
      .catch((error) => {
        console.log('유저 정보 업데이트 실패', error);
      });
  };

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleNicknameChange = (e) => {
    setNewNickname(e.target.value);
  };

  const handleCharacterChange = (e) => {
    setCharacterId(e.target.value);
  };

  return (
    <div>
      <div>
        <div>현재 닉네임 : {user.nickname}</div>
        {/* <input
          type="text"
          value={newNickname}
          onChange={handleNicknameChange}
        /> */}
        <div>현재 캐릭터 ID : {user.characterId}</div>
        {/* <input
          type="number"
          value={newCharacterId}
          onChange={handleCharacterChange}
        /> */}
        <div>현재 상태 : {user.status}</div>
        {/* <input
          type="text"
          value={newStatus}
          onChange={handleStatusChange}
        /> */}
        {/* <button onClick={handleUserUpdateClick}>확인</button> */}
      </div>
    </div>
  );
};

export default ProfilePage;