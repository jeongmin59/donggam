// 왼쪽 화면 관련 api
import axiosInstance from "./axiosConfig";

// 사진 리스트 조회
export const getPhoto = async () => {
  try {
    const response = await axiosInstance.get(`/time`);
    return response.data;
  } catch (error) {
    console.log('조회 실패', error)
    return error;
  }
};
