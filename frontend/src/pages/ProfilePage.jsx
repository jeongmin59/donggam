import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { CharacterIdAtom, NicknameAtom, StatusMessageAtom, StatusMessageIdAtom } from '../recoil/user/userAtom';
import { updateUser } from '../api/userApi';
import { useNavigate } from 'react-router-dom';
import CharacterModal from '../components/character/CharacterModal';
import Header from '../components/common/Header';

const ProfilePage = () => {
  // 전역상태의 유저 정보 가져오기
  const [nickName, setNickname] = useRecoilState(NicknameAtom);
  const [characterId, setCharterId] = useRecoilState(CharacterIdAtom);
  const [status, setStatus] = useRecoilState(StatusMessageAtom);
  const setStatusId = useSetRecoilState(StatusMessageIdAtom);

  // useState를 통한 유저 정보 업데이트
  const [newNickname, setNewNickname] = useState(nickName);
  const [newCharacterId, setNewCharacterId] = useState(characterId);
  const [newStatus, setNewStatus] = useState(status);

  console.log(newCharacterId)

  // 캐릭터 이미지 주소
  const myCharacter = `/character/${characterId}.svg`

  // 유저 정보 업데이트 후 네비게이트 해주기
  const navigator = useNavigate();

  // 모달 열고 닫기
  const [isModalOpen, setIsModalOpen] = useState(false)


  const handleUserUpdateClick = () => {

    const updatedUser = {
      nickname: newNickname,
      status: newStatus,
      characterId: newCharacterId,
    }
    updateUser(updatedUser)

      .then((res) => {
        setNickname(newNickname)
        setCharterId(newCharacterId)
        setStatus(newStatus)
        setStatusId(res.data.statusId)

        navigator('/') // 정보 수정 후 메인페이지 이동
        console.log('유저정보 변경', res)
      })
      .catch((err) => {
        console.log('유저 정보 변경 안됨 ㄱ-', err)
      })
  }

  const handleNicknameChange = (e) => {
    setNewNickname(e.target.value);
  };

  const handleCharacterChange = (characterId) => {
    setNewCharacterId(characterId);
  };

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  // 모달 관련 로직
  const modalOpen = () => {
    setIsModalOpen(true)
  }

  const modalClose = () => {
    setIsModalOpen(false)
  }


  return (
    <div>
      <Header title="내 프로필 만들기"/>
      <div className='px-5'>
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
          <div className=' text-gray-500'> 최소 2글자 이상 작성해주세요. </div>


          <div
            onClick={modalOpen}
            className="flex justify-center items-center" style={{ height: "100" }}>
            <img src={myCharacter} alt={`${newCharacterId}번 캐릭터`} />
          </div>

          <div>
            {isModalOpen && (
              <CharacterModal onClose={modalClose} changeCharacter={handleCharacterChange}
                nowCharacterId={newCharacterId} />
            )}
          </div>
          <button onClick={handleUserUpdateClick}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;