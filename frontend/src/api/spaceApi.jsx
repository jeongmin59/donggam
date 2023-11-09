import axiosInstance from "./axiosConfig";

// 주변 방명록 조회
export const getTraceList = async () => {
  try {
    const res = await axiosInstance.get(`/space`);
    console.log('주변 방명록 가져오기 성공', res)
    return res.data;
  } catch (err) {
    console.log('주변 방명록 가져오기 실패!', err)
    return err;
  }
};

// 방명록 작성
export const postTrace = async ({ title, content, latitude, longitude, imageFile }) => {
  try {
    const trace = {
      "title": title,
      "content": content,
      "latitude": latitude,
      "longitude": longitude
    }
    const formData = new FormData();
    formData.append('request', new Blob([JSON.stringify(trace)], { type: 'application/json' }));
    formData.append('image', imageFile);

    const res = await axiosInstance.post(`/space`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('방명록 작성 완 ㅋ', res.data);
    return res.data;
  } catch (err) {
    console.log('방명록 작성 실패 ㄱ-', err)
  }
}

// 방명록 상세 보기
export const getTraceDetail = async (recordId) => {
  try {
    const res = await axiosInstance.get(`/space/${recordId}`);
    console.log('방명록 내가 다봣지롱 ㅋ', res)
    return res.data;
  } catch (err) {
    console.log('방명록 훔쳐보기 실패 ㄱ-', err)
    return err;
  }
};

// 방명록 댓글 달기
export const postTraceComment = async (recordId, content) => {
  try {
    const res = await axiosInstance.post(`/space/${recordId}`, { content });
    console.log('댓글 달기 완 ㅋ', res)
    return res.data;
  } catch (err) {
    console.log('댓글 달게해줘! ㄱ-', err)
    return err;
  }
};

// 내 방명록 목록 조회
export const getMyTrace = async () => {
  try {
    const res = await axiosInstance.get(`/space/mine`);
    // console.log('내 방명록 가져오기 성공', res)
    return res.data;
  } catch (err) {
    console.log('내 방명록 가져오기 실패!', err)
    return err;
  }
};