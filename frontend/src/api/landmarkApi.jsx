import axios from "axios";
import axiosInstance from "./axiosConfig";

// 근처 랜드마크 찾기
export const searchLandmark = async ( latitude, longitude) => {
  try{
    const res = await axiosInstance.post(`/space/landmark/search`,{
      latitude: latitude,
      longitude: longitude,
    });
    // console.log('랜드마크 검색 axios 성공! 쿌쿌~', res)
    return res.data;
  } catch (err) {
    // console.log('랜드마크 검색 axios 실패..', err)
    return err;
  }
};


// 랜드마크 방명록 작성
export const postLandmark =async( landmarkId, content, imageFile) => {
  try {
    const formData = new FormData()
    formData.append('content', content);
    formData.append('image', imageFile)

    const res = await axiosInstance.post(`/space/landmark/${landmarkId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },    
    });
    // console.log('랜드마크 방명록 작성 axios 성공', res);
    return res.data;
  } catch (err) {
    // console.log('랜드마크 방명록 axios 실패',err)
    return err;
  }
}

// 랜드마크 방명록 조회
export const getLandmarkGuestbook = async (landmarkId) => {
  try {
    const res = await axiosInstance.get(`/space/landmark/${landmarkId}`);
    // console.log('랜드마크 방명록 조회 axios 성공', res);
    return res.data;
  } catch (err) {
    // console.log('랜드마크 방명록 조회 axios 실패', err);
    return err;
  }
};