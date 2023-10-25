import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const LoginRediect = () => {
  const navigator = useNavigate();

  // REDIRECT_URL의 Params로 온 인가코드 받아오기
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    axios.get(`http://k9e107.p.ssafy.io/member/login?code=${code}`
    )
      .then((res) => {
        console.log('성공!!', res.data);
        window.localStorage.setItem("accessToken", res.data.accessToken); //localStorage에 accessToken 저장하기
        navigator('/') // 로그인 성공 후 메인페이지로 이동
      })
      .catch(err => {
        console.log('실패!!!!!!', err);
      });
  }, []);


  return (
    <div>
      로그인 중..
    </div>
  );
};

export default LoginRediect;