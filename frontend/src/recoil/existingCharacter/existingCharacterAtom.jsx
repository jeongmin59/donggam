import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "existingCharacters",
  storage: localStorage,
});

export const existingCharacterAtom = atom({
  key: "existingCharactersAtom",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
