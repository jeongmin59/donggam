import axiosInstance from "./axiosConfig";

// 전체 정보 수정
export const updateUser = async ({ nickname, status, characterId }) => {
  try {
    const res = await axiosInstance.post(`/member/update`, {
      nickname: nickname,
      status: status,
      characterId: characterId
    });
    return res.data;
  } catch (err) {
    console.log('유저 정보 변경 실패!', err)
    return err;
  }
};

// 닉네임 변경
export const updateNickname = async (nickname) => {
  try {
    const res = await axiosInstance.post(`/member/nickname`, {
      nickname: nickname
    });
    console.log(' 닉네임 변경 됏나', res)
    console.log('nickname', nickname)
    return res.data;
  } catch (err) {
    console.log('닉네임 변경 실패!', err)
    return err;
  }
};

// 상태메시지 변경
export const updateStatus = async (status) => {
  try {
    const res = await axiosInstance.post(`/member/status`, {
      status: status
    });
    return res.data;
  } catch (err) {
    console.log('상태메시지 변경 실패!', err)
    return err;
  }
};

// 캐릭터 변경
export const updateCharacter = async (characterId) => {
  try {
    const res = await axiosInstance.post(`/member/character`, {
      characterId: characterId
    });
    return res.data;
  } catch (err) {
    console.log('캐릭터 변경 실패!', err)
    return err;
  }
};