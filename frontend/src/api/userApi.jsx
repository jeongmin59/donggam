import axiosInstance from "./axiosConfig";

// 닉네임 변경
export const updateNickname = async (nickname) => {
  try {
    const res = await axiosInstance.put(`/member/nickname`, {
      params: {
        nickname: nickname
      }
    });
    return res.data;
  } catch (err) {
    console.log('닉네임 변경 실패!', err)
    return err;
  }
};

// 상태메시지 변경
export const updateStatus = async (status) => {
  try {
    const res = await axiosInstance.put(`/member/status`, {
      params: {
        status: status
      }
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
    const res = await axiosInstance.put(`/member/character`, {
      params: {
        characterId: characterId
      }
    });
    return res.data;
  } catch (err) {
    console.log('캐릭터 변경 실패!', err)
    return err;
  }
};


