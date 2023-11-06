import axiosInstance from "./axiosConfig";

export const searchLandmark = async ( latitude, longitude) => {
  try{
    const res = await axiosInstance.post(`/space/landmark/search`,{
      latitude: latitude,
      longitude: longitude,
    });
    console.log('랜드마크 검색 axios 성공! 쿌쿌~', res)
    return res.data;
  } catch (err) {
    console.log('랜드마크 검색 axios 실패..', err)
    return err;
  }
}