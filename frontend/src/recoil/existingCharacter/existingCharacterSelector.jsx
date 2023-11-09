import { selector } from "recoil";
import { existingCharacterAtom } from "./existingCharacterAtom";

export const existingCharactersSelector = selector({
  key: "existingCharactersSelector",
  get: ({ get }) => {
    const existingCharacters = get(existingCharacterAtom);
    return existingCharacters;
  },
  set: ({ set }, newValue) => {
    set(existingCharacterAtom, newValue);
  },
});
