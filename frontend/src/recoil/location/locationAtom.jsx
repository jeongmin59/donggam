import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// 새로 고침 후에도 전역 상태 유지
const { persistAtom } = recoilPersist({
  key: "Location",
  storage: localStorage,
})

// 위도
export const LatitudeAtom = atom({
  key: 'Latitude',
  default: null,
  effects_UNSTABLE: [persistAtom]
})

// 경도 
export const LongitudeAtom = atom({
  key: 'Longitude',
  default: null,
  effects_UNSTABLE: [persistAtom]
})