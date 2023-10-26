import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const LoginRediect = () => {
  const navigator = useNavigate();

  // REDIRECT_URL의 Params로 온 인가코드 받아오기
  const code = new URL(window.location.href).searchParams.get('code');

  //로그인 요청 후 받아올 수 있는 데이터 목록
  // accessToken, userId, status, cheracterId, nickname

  useEffect(() => {
    axios.get(`http://k9e107.p.ssafy.io/member/login?code=${code}`
    )
      .then((res) => {
        console.log('성공!!', res.data);
        window.localStorage.setItem("accessToken", res.data.data.accessToken); //localStorage에 accessToken 저장하기

        // const userId = res.data.data.userId;
        // const status = res.data.data.status;
        const status = false;
        const userId = 1;

        // 로그인 성공 후 상태 메시지 설정 여부에 따라 네비게이트 해주기
        if (status) {
          navigator(`/`) // 메인페이지 이동
        }
        else {
          navigator(`/profile/${userId}`) // 프로필 설정 페이지 이동
        }
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