import { selector } from 'recoil';
import { AccessTokenAtom, MemberIdAtom, NicknameAtom, CharacterIdAtom, StatusMessageAtom } from './userAtom';

export const UserSelector = selector({
  key: 'UserSelector',
  get: ({ get }) => {
    const accessToken = get(AccessTokenAtom);
    const memberId = get(MemberIdAtom);
    const nickname = get(NicknameAtom);
    const characterId = get(CharacterIdAtom);
    const statusMessage = get(StatusMessageAtom);

    const user = {
      accessToken,
      memberId,
      nickname,
      characterId,
      statusMessage,
    };

    return user;
  },
});
