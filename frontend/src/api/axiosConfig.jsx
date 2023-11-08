import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,  // 추후 .env 파일에 생성
  baseURL: "https://k9e107.p.ssafy.io",
  // baseURL: "http://localhost:8080",
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
    if (error.response.status === 401) {
      console.log("엑세스 토큰 만료!");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;