import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { CharacterIdAtom, NicknameAtom, StatusMessageAtom } from '../recoil/user/userAtom';
import { updateUser } from '../api/userApi';

const ProfilePage = () => {
  // 전역상태의 유저 정보 가져오기
  const [nickName, setNickname] = useRecoilState(NicknameAtom);
  const [characterId, setCharterId] = useRecoilState(CharacterIdAtom);
  const [status, setStatus] = useRecoilState(StatusMessageAtom);

  // useState를 통한 유저 정보 업데이트
  const [newNickname, setNewNickname] = useState(nickName);
  const [newCharacterId, setNewCharacterId] = useState(characterId);
  const [newStatus, setNewStatus] = useState(status);

  // 캐릭터 이미지 주소
  const myCharacter = `/character/${characterId}.svg`



  const handleUserUpdateClick = () => {

    const updatedUser = {
      nickname: newNickname,
      status: newStatus,
      characterId: newCharacterId
    }
    updateUser(updatedUser)

      // updateNickname(newNickname)

      .then((res) => {
        setNickname(newNickname)
        setCharterId(newCharacterId)
        setStatus(newStatus)
        console.log('유저정보 변경', res)
      })
      .catch((err) => {
        console.log('유정 정보 변경 안됨 ㄱ-', err)
      })
  }

  const handleNicknameChange = (e) => {
    setNewNickname(e.target.value);
  };

  const handleCharacterChange = (e) => {
    setNewCharacterId(e.target.value);
  };

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };



  return (
    <div>
      <div>
        <label htmlFor="nickname" className="block text-sm font-medium leading-6 text-gray-900">닉네임</label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            id="nickname"
            value={newNickname}
            onChange={handleNicknameChange}
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder={nickName} />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">상태메시지</label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              type="text"
              id="status"
              value={newStatus}
              onChange={handleStatusChange}
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder={status} />
          </div>

          <div className="flex justify-center items-center" style={{ height: "100" }}>
            <img src={myCharacter} alt={`${characterId}번 캐릭터`} />
          </div>
          <div>현재 캐릭터 : {characterId}</div>
          <input
            type="number"
            value={newCharacterId}
            onChange={handleCharacterChange}
          />

          <button onClick={handleUserUpdateClick}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;