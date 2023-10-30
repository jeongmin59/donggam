import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,  // 추후 .env 파일에 생성
  baseURL: "http://k9e107.p.ssafy.io",
  headers: {
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*'
  },
});

// Axios 인스턴스에 요청 전에 실행할 인터셉터 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    // console.log('액세스토큰', accessToken)

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    console.log("엑세스 토큰 없음!");
    return Promise.reject(error);
  }
);

export default axiosInstance;