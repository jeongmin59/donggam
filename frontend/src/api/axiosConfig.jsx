import axios from "axios";
import { checkAccessTokenExpiration } from "../recoil/user/userAtom";

const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,  // 추후 .env 파일에 생성
  // baseURL: "https://k9e107.p.ssafy.io",
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*'
  },
});

// Axios 인스턴스에 요청 전에 실행할 인터셉터 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    // 토큰이 만료되었거나 없다면
    if (!checkAccessTokenExpiration()) {
      alert('로그아웃 되었습니다.\n다시 로그인 해주세요.');
      window.location.href = '/login';
    }
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 404) {
      alert('로그아웃 되었습니다.\n 다시 로그인 해주세요.');
      window.location.href = '/login';
    } else if(error.response?.status === 500) {
      alert('상태메시지를 설정해주세요');
      window.location.href = '/profile';
    }
  }
)

export default axiosInstance;