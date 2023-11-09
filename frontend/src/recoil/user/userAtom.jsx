import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// 새로 고침 후에도 전역 상태 유지
const { persistAtom } = recoilPersist({
  key: "User",
  storage: localStorage,
})

//액세스 토큰
export const AccessTokenAtom = atom({
  key: 'AccessToken',
  default: null,
  effects_UNSTABLE: [persistAtom]
})

export const AccessTokenExpirationAtom = atom({
  key: 'AccessTokenExpiration',
  default: null,
  effects_UNSTABLE: [persistAtom]
})

//유저 아이디
export const MemberIdAtom = atom({
  key: 'MemberIdAtom',
  default: null,
  effects_UNSTABLE: [persistAtom]
})

// 닉네임
export const NicknameAtom = atom({
  key: 'NicknameAtom',
  default: '',
  effects_UNSTABLE: [persistAtom]
});

// 캐릭터 id
export const CharacterIdAtom = atom({
  key: 'CharacterIdAtom',
  default: null,
  effects_UNSTABLE: [persistAtom]
});

// 상태 메시지
export const StatusMessageAtom = atom({
  key: 'StatusMessageAtom',
  default: '',
  effects_UNSTABLE: [persistAtom]
});

// 상태 메시지 id
export const StatusMessageIdAtom = atom({
  key: 'StatusMessageIdAtom',
  default: null,
  effects_UNSTABLE: [persistAtom]
});

// localStorage에서 UserAtom 가져올 때 AccessTokenExpiration이 현재 시간보다 지났는지 확인하는 함수
export const checkAccessTokenExpiration = () => {
  const now = new Date();
  const storedUser = JSON.parse(localStorage.getItem('User'));
  const accessToken = localStorage.getItem('accessToken');

  // 1. accessToken이 없다.
  if (!accessToken) {
    return false;
  }
  
  // 2. accessToken이 만료되었다.
  if (storedUser && storedUser.AccessTokenExpiration && new Date(storedUser.AccessTokenExpiration) < now) {
    const updatedUser = {
      ...storedUser,
      AccessToken: null,
      AccessTokenExpiration: null,
    };
    localStorage.setItem('User', JSON.stringify(updatedUser));

    return false;
  }

  return true;
};