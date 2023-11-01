import { selector } from 'recoil';
import { AccessTokenAtom, MemberIdAtom, NicknameAtom, CharacterIdAtom, StatusMessageAtom, StatusMessageIdAtom } from './userAtom';

export const UserSelector = selector({
  key: 'UserSelector',
  get: ({ get }) => {
    const accessToken = get(AccessTokenAtom);
    const memberId = get(MemberIdAtom);
    const nickname = get(NicknameAtom);
    const characterId = get(CharacterIdAtom);
    const statusMessage = get(StatusMessageAtom);
    const StatusMessageId = get(StatusMessageIdAtom);

    const user = {
      accessToken,
      memberId,
      nickname,
      characterId,
      statusMessage,
      StatusMessageId
    };

    return user;
  },
});
