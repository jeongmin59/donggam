import { selector } from 'recoil';
import { AccessTokenAtom, AccessTokenExpirationAtom, MemberIdAtom, NicknameAtom, CharacterIdAtom, StatusMessageAtom, StatusMessageIdAtom } from './userAtom';

export const UserSelector = selector({
  key: 'UserSelector',
  get: ({ get }) => {
    const accessToken = get(AccessTokenAtom);
    const accessTokenExpiration = get(AccessTokenExpirationAtom)
    const memberId = get(MemberIdAtom);
    const nickname = get(NicknameAtom);
    const characterId = get(CharacterIdAtom);
    const statusMessage = get(StatusMessageAtom);
    const StatusMessageId = get(StatusMessageIdAtom);

    const user = {
      accessToken,
      accessTokenExpiration,
      memberId,
      nickname,
      characterId,
      statusMessage,
      StatusMessageId
    };

    return user;
  },
});
