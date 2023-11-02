import axiosInstance from "./axiosConfig";

// 전체 status 리스트 가져오기
export const getStatusList = async () => {
  try {
    const res = await axiosInstance.get(`/message/status/list`);
    // console.log('상메axios 가져오기 성공', res)
    return res.data.data;
  } catch (err) {
    console.log('상메 axios 실패!', err)
    return err;
  }
};