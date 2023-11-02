import axiosInstance from "./axiosConfig";

// 쪽지 전송
export const sendMail =async (statusId, content, imageFile) => {
  try {
    const message = {
      "statusId" : statusId,
      "content" : content,
    }
    const formData = new FormData();
    formData.append('request', new Blob([JSON.stringify(message)], { type: 'application/json' }));
    formData.append('image', imageFile);
    
    const res = await axiosInstance.post(`/message/send`, formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
        // "Content-Type": "application/json",
      },
    });
    console.log('쪽지 전송 axios 성공', res.data);
    return res.data;
  } catch (err) {
    console.log('쪽지 전송 axios 실패', err)
  }
}

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

// status에 따른 쪽지 목록 가져오기
export const getMailList = async (statusId) => {
  try {
    const res = await axiosInstance.get(`/message/list/${statusId}`, {
      params: { statusId },
    });
    // console.log('쪽지axios 가져오기 성공', res.data)
    return res.data;
  } catch (err) {
    console.log('쪽지 axios 실패!', err)
    return err;
  }
};