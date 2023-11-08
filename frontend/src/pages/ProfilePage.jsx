import React, { useState, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { CharacterIdAtom, NicknameAtom, StatusMessageAtom, StatusMessageIdAtom } from '../recoil/user/userAtom';
import { updateUser } from '../api/userApi';
import { useNavigate } from 'react-router-dom';
import CharacterModal from '../components/character/CharacterModal';
import ProfileHeader from '../components/character/ProfileHeader';
import editIcon from '../assets/icons/edit-icon.png';
import ToastModal from '../components/common/ToastModal';

const ProfilePage = () => {
  // 전역 상태의 유저 정보 가져오기
  const [nickName, setNickname] = useRecoilState(NicknameAtom);
  const [characterId, setCharterId] = useRecoilState(CharacterIdAtom);
  const [status, setStatus] = useRecoilState(StatusMessageAtom);
  const setStatusId = useSetRecoilState(StatusMessageIdAtom);

  // useState를 통한 유저 정보 업데이트
  const [newNickname, setNewNickname] = useState(nickName);
  const [newCharacterId, setNewCharacterId] = useState(characterId);
  const [newStatus, setNewStatus] = useState(status);

  // 유저 정보 업데이트 후 네비게이트 해주기
  const navigator = useNavigate();

  // 모달 열고 닫기
  const [isModalOpen, setIsModalOpen] = useState(false);

  // newCharacterId가 변경될 때 렌더링
  useEffect(() => {
    // newCharacterId가 변경될 때 실행
    const myCharacter = `/character/${newCharacterId}.svg`;
  }, [newCharacterId]);

  // 캐릭터 이미지 주소
  const myCharacter = `/character/${newCharacterId}.svg`;

  const handleUserUpdateClick = async () => {
    try {
      if ((newStatus.length >= 2)) {
        const updatedUser = {
          nickname: newNickname,
          status: newStatus,
          characterId: newCharacterId,
        };
        updateUser(updatedUser)
          .then((res) => {
            setNickname(newNickname);
            setCharterId(newCharacterId);
            setStatus(newStatus);
            setStatusId(res.data.statusId);
            navigator('/'); // 정보 수정 후 메인페이지 이동
            console.log('유저정보 변경', res);
          })
      }
      else {
        handleToastOpen();
      }
    } catch (err) {
      console.log('유저 정보 변경 안됨 ㄱ-', err);
    }
  };

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
    setIsModalOpen(true);
  };

  const modalClose = () => {
    setIsModalOpen(false);
  };

  // 토스트 모달 관련
  const [showToast, setShowToast] = useState(false);

  const handleToastOpen = () => {
    setShowToast(true);
  };



  return (
    <div>
      <div className="mb-20">
        <ProfileHeader title="내 프로필 만들기" onConfirmClick={handleUserUpdateClick} />
      </div>
      <div className="px-5">
        <div className="px-5 rounded-md shadow-sm">
          <input
            type="text"
            id="nickname"
            value={newNickname}
            onChange={handleNicknameChange}
            className="block w-full py-1.5 pl-2 pr-20 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 border-b-2 border-slate-700"
            placeholder={nickName}
            maxLength={12}
          />
        </div>

        <div onClick={modalOpen} className="mt-24 mb-20 h-full flex flex-col justify-center items-center">
          <div className="relative">
            <img src={myCharacter} alt={`${newCharacterId}번 캐릭터`} />
            <div className="absolute right-0 bottom-0">
              <img src={editIcon} alt="수정 아이콘" className="w-8 h-auto"></img>
            </div>
          </div>
          <h5>캐릭터 변경하기</h5>
        </div>

        <div>
          {isModalOpen && (
            <CharacterModal onClose={modalClose} changeCharacter={handleCharacterChange} nowCharacterId={newCharacterId} />
          )}
        </div>

        <div>
          <div className="relative px-5 rounded-md shadow-sm">
            <label htmlFor="status" className="mb-2 pl-2 block text-sm font-medium leading-6 text-gray-900">상태메시지</label>
            <input
              type="text"
              id="status"
              value={newStatus}
              onChange={handleStatusChange}
              className="block w-full py-1.5 pl-2 pr-20 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 border-b-2 border-slate-700"
              placeholder={status}
              maxLength={50}
            />
          </div>
          <h5 className="mt-2 px-5 text-gray-500">* 최소 2글자 이상 작성해주세요. </h5>
        </div>
      </div>
      {showToast && <ToastModal message="상태 메시지를 2자 이상 입력해주세요!" onClose={() => setShowToast(false)} />}
    </div>
  );
};

export default ProfilePage;
