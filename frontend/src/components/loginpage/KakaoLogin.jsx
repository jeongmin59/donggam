import React from "react";
import KakaoLoginButton from "../../assets/kakao_login_button.png";

const KakaoLogin = () => {
  //나중에 .env 파일에 보관해주기
  const REST_API_KEY = "48fe0d040eac475f7b407702d4e3d9ca";
  const REDIRECT_URI = "https://donggam.site/kakao/callback";
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URI;
  };

  return (
    <>
      <img
        src={KakaoLoginButton}
        alt="Kakao Login Button"
        onClick={handleLogin}
        style={{ cursor: "pointer" }}
      />
    </>
  );
};

export default KakaoLogin;
