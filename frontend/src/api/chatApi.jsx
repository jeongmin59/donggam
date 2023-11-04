import axiosInstance from "./axiosConfig";

// 전체 채팅방 가져오기
export const getChatList = async () => {
  try {
    const res = await axiosInstance.get(`/room/list`, {
      params: {

      }
    });
    // console.log('상메axios 가져오기 성공', res)
    return res.data.data;
  } catch (err) {
    console.log('상메 axios 실패!', err)
    return err;
  }
};