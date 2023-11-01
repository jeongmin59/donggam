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