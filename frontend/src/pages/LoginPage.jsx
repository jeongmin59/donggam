import React from "react";
import KakaoLogin from "../components/loginpage/KakaoLogin";
import loginLogo from "../assets/images/loginlogo.svg";

const LoginPage = () => {
  return (
    <div className=" relative bg-white flex flex-col items-center justify-center h-screen">
      <img src={loginLogo} alt="로고" />
      <div className="absolute bottom-20 px-10">
        <KakaoLogin />
      </div>
    </div>
  );
};

export default LoginPage;
