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
      },
    });
    // console.log('쪽지 전송 axios 성공', res.data);
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


// 쪽지 상세 조회
export const getMailDetail = async (messageId) => {
  try {
    const res = await axiosInstance.get(`/message/detail/${messageId}`, {
      params: { messageId },
    });
    // console.log('쪽지디테일axios 가져오기 성공', res.data.data)
    return res.data.data;
  } catch (err) {
    console.log('쪽지디테일 axios 실패!', err)
    return err;
  }
};

// 쪽지 좋아요
export const postMailLike = async (messageId, isLiked) => {
  try {
    const res = await axiosInstance.post(`/message/like`, {
      messageId: messageId,
      isLiked: isLiked,
    });
    // console.log('쪽지 성공', res.data)
    return res.data;
  } catch (err) {
    console.log('쪽지 좋아요 실패!', err)
    return err;
  }
};

// 쪽지 읽음 처리
export const postMailRead = async (messageId) => {
  try {
    const res = await axiosInstance.post(`/message/read/${messageId}`, {
      params: { messageId },
    });
    // console.log('쪽지 읽음 처리 성공', res.data)
    return res.data;
  } catch (err) {
    console.log('쪽지 읽음 처리 실패!', err)
    return err;
  }
};

