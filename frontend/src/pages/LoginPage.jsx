import React from "react";
import KakaoLogin from "../components/loginpage/KakaoLogin";
import loginLogo from "../assets/images/loginlogo.svg";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={loginLogo} alt="로고" />
      <KakaoLogin />
    </div>
  );
};

export default LoginPage;
